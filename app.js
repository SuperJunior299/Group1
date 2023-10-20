const express = require('express');
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 3000; 
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10; 
const path = require('path');
const mongoose = require('mongoose');
const dbName = 'Web'; 
const mongoUrl = 'mongodb+srv://lekhanhtoan07:T14012003oan@server1.h0nl7gl.mongodb.net/';
const collectionName = 'Test';
const flash = require('connect-flash');


app.set('views', path.join( 'views', 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(flash());


mongoose.connect('mongodb+srv://lekhanhtoan07:T14012003oan@server1.h0nl7gl.mongodb.net/')
    .then(() => console.log('Connected to MongoDB '))
    .catch((error) => console.log(error.message));


    
app.get('/', (req, res) => {
    res.render('index', { errorMessage: '' }); 
});
app.get('/index', (req, res) => {
    res.render('index', { errorMessage: '' }); 
});


app.get('/loginpage', (req, res) => {
  res.render('loginpage',{ errorMessage: '' }); 
});

app.get('/pathwayselection', (req, res) => {
    res.render('pathwayselection', { message: null });
});

app.get('/home', (req, res) => {
    res.render('home', { message: null });
})
app.get('/pathway_python', (req, res) => {
    res.render('pathway_python', { message: null });
});


// Register Function
app.post('/index', async (req, res) => {
    const { fullName,  email, username, phone, password } = req.body;
    let errorMessage = '';
    try {
        const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Check if email or username already exist
        const existingUser = await collection.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            errorMessage = 'Email or username already exists';

        }
        if (password.length < 8) {
            errorMessage = 'Password must be at least 8 characters long';
        }
        
        if (errorMessage) {
            res.render('index', { errorMessage });
        } else {

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = {
            fullName,
            email,
            username,
            phone,
            password: hashedPassword,
        };

        const result = await collection.insertOne(newUser);
        if (result.insertedCount === 1) {
            res.render('index', { errorMessage: 'Registration failed'  });
        } else {
            res.render('loginpage');
        }}

        client.close();
    } catch (error) {
        req.flash('error', 'Internal server error'); 
        res.redirect('/index');
    }
});


//Login Function
app.post('/loginpage', async (req, res) => {
    const {  username,  password } = req.body;
    
    try {
      const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      // Find a user with the provided username and password
      console.log('Entered Username:', username);
      console.log('Entered Password:', password);
      
      const user = await collection.findOne({ username: username });
      
      if (user) {
          console.log('Hashed Password in Database:', user.password);
          if (await bcrypt.compare(password, user.password)) {
              res.redirect('/pathwayselection');

          } else {
              console.log('Passwords do not match.');
              res.render('loginpage',   {errorMessage: 'Wrong password'});
          }
      } else {
          console.log('User not found.');
          res.render('loginpage', {errorMessage: 'User not found'});
      }
      client.close();

      } catch (error) {
          console.error(error);
          res.status(500).send('Internal server error');
      }
      
    });



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});  