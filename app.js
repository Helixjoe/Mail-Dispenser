// // Reading data from file
// const inputElement = document.getElementById(".fileInput");
// inputElement.addEventListener("change", handleFileSelect, false);
// function handfiles() {
//   const fileList = this.files;
// }
// const numFiles = fileList.length;
// console.log(numFiles);

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile("/index.html");
});
app.post("/email", function (req, res) {
  const emailId = req.body.email;
  res.send("Is your email " + emailId + "?");
});
app.listen(3000, function () {
  console.log("Server is running successfully on port 3000");
});
