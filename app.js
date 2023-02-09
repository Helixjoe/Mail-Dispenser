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
// Post route to handle retrieving data from HTML form to server
app.post("/send_email", (req, res) => {
  if (error) {
    console.log(err);
    return res.send("Error uploading file");
  } else {
    const recipient = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;
    const attachmentPath = req.file.path;
    console.log("recipient:", recipient);
    console.log("subject:", subject);
    console.log("message:", message);
    console.log("attachmentPath:", attachmentPath);
  }
});
app.listen(3000, function () {
  console.log("Server is running successfully on port 3000");
});
