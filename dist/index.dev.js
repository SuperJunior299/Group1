"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var _require = require('mongodb'),
    MongoClient = _require.MongoClient;

var port = process.env.PORT || 3000;
var app = express();
var mongoUrl = 'mongodb+srv://lekhanhtoan07:T14012003oan@server1.h0nl7gl.mongodb.net/';
var dbName = 'Web';
var collectionName = 'Test';
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express["static"]('public')); // Serve HTML and CSS files from the 'public' directory

app.post('/register', function _callee(req, res) {
  var _req$body, fullName, dateOfBirth, email, username, phone, password, client, db, collection, existingUser, newUser, result;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, fullName = _req$body.fullName, dateOfBirth = _req$body.dateOfBirth, email = _req$body.email, username = _req$body.username, phone = _req$body.phone, password = _req$body.password;
          _context.prev = 1;
          client = new MongoClient(mongoUrl, {
            useUnifiedTopology: true
          });
          _context.next = 5;
          return regeneratorRuntime.awrap(client.connect());

        case 5:
          db = client.db(dbName);
          collection = db.collection(collectionName); // Check if email or username already exist

          _context.next = 9;
          return regeneratorRuntime.awrap(collection.findOne({
            $or: [{
              email: email
            }, {
              username: username
            }]
          }));

        case 9:
          existingUser = _context.sent;

          if (!existingUser) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", res.send('Email or username already exists'));

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
          _context.next = 15;
          return regeneratorRuntime.awrap(collection.insertOne(newUser));

        case 15:
          result = _context.sent;

          if (result.insertedCount === 1) {
            res.send('Registration failed.');
          } else {
            res.send('Registration successful! ');
          }

          client.close();
          _context.next = 24;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0);
          res.status(500).send('Internal server error');

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 20]]);
});
app.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});
//# sourceMappingURL=index.dev.js.map
