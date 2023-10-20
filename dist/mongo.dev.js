"use strict";

var mongoose = require("mongoose");

mongoose.connect("mongodb+srv://lekhanhtoan07:T14012003oan@server1.h0nl7gl.mongodb.net/").then(function () {
  console.log('mongoose connected');
})["catch"](function (e) {
  console.log('failed');
});
var logInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
var Test = new mongoose.model('Test', logInSchema);
module.exports = Test;
//# sourceMappingURL=mongo.dev.js.map
