const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const studentRouter = require("../routes/student");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/studentdb", () => {
  console.log("connected to Student Data base");
});
const port = 8080;
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// your code goes here
app.use("/api/student", studentRouter);
app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
