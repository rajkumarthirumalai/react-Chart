const Parse = require("parse/node");
Parse.initialize(123, 123);
// Parse.serverURL = "http://localhost:1337/parse";
Parse.serverURL = "http://207.244.108.206:1338/parse";
// const express = require("express");
// var bodyParser = require("body-parser");
// const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   });
setInterval(() => {
  const Person = new Parse.Object("randomvalues");
  Person.set("high", Math.floor( Math.random() * 100));
  Person.set("low", Math.floor( Math.random() * 100));
  Person.set("open", Math.floor( Math.random() * 100));
  Person.set("close", Math.floor( Math.random() * 100));
  Person.save().then((res) => console.log(res));
}, 3000);

// const query = new Parse.Query("randomvalues");
// query.first().then((e) => {
//   setInterval(() => {
//     let randomNo = Math.random() * 100;
//     e.set("randomnumber", randomNo);
//     e.save().then((res) => console.log(res));
//   }, 4000);
// });
