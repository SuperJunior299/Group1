"use strict";

var express = require('express');

var _require = require('mongodb'),
    MongoClient = _require.MongoClient;

var port = process.env.PORT || 3000;
var app = express();

var mongoose = require('mongoose');

var dbName = 'Web';
var mongoUrl = 'mongodb+srv://lekhanhtoan07:T14012003oan@server1.h0nl7gl.mongodb.net/';
var collectionName = 'Test';
app.use(express.urlencoded({
  extended: true
}));
app.use(express["static"]('public'));
app.use(express.json()); // REGISTER FUNCTION

app.get("/index", function (req, res) {
  res.render("index");
});
app.get('/loginpage', function (req, res) {
  // Handle the GET request for the login page
  res.render('loginpage'); // Or send a login HTML page
});
app.post('/loginpage', function _callee(req, res) {
  var _req$body, username, password, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password; // Find a user with the provided username and password

          _context.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            username: username,
            password: password
          }));

        case 3:
          user = _context.sent;

          if (user) {
            res.status(200).json({
              message: 'Login successful'
            });
          } else {
            res.status(401).json({
              message: 'Login failed'
            });
          }

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.post('/index', function _callee2(req, res) {
  var _req$body2, fullName, dateOfBirth, email, username, phone, password, client, db, collection, existingUser, newUser, result;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, fullName = _req$body2.fullName, dateOfBirth = _req$body2.dateOfBirth, email = _req$body2.email, username = _req$body2.username, phone = _req$body2.phone, password = _req$body2.password;
          _context2.prev = 1;
          client = new MongoClient(mongoUrl, {
            useUnifiedTopology: true
          });
          _context2.next = 5;
          return regeneratorRuntime.awrap(client.connect());

        case 5:
          db = client.db(dbName);
          collection = db.collection(collectionName); // Check if email or username already exist

          _context2.next = 9;
          return regeneratorRuntime.awrap(collection.findOne({
            $or: [{
              email: email
            }, {
              username: username
            }]
          }));

        case 9:
          existingUser = _context2.sent;

          if (!existingUser) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.send('Email or username already exists'));

        case 12:
          // Insert the new user into the database
          newUser = {
            fullName: fullName,
            dateOfBirth: dateOfBirth,
            email: email,
            username: username,
            phone: phone,
            password: password
          };
          _context2.next = 15;
          return regeneratorRuntime.awrap(collection.insertOne(newUser));

        case 15:
          result = _context2.sent;

          if (result.insertedCount === 1) {
            res.send('Registration failed.');
          } else {
            res.send('Registration successful! ');
          }

          client.close();
          _context2.next = 24;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](1);
          console.error(_context2.t0);
          res.status(500).send('Internal server error');

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 20]]);
});
app.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});
//# sourceMappingURL=app.dev.js.map
