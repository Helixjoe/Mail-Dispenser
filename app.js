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
const multer = require("multer");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
// Multer file storage
const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./attachments");
  },
  filename: function (req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});
// Middleware to get a single attachment
const attachmentUpload = multer({
  storage: Storage,
}).single("attachment");
app.get("/", function (req, res) {
  res.sendFile("/index.html");
});
app.post("/email", function (req, res) {
  console.log(req.body);
});
app.listen(3000, function () {
  console.log("Server is running successfully on port 3000");
});
