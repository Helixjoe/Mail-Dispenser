const express = require("express");
const multer = require("multer");
const validator = require("node-email-validation");
const app = express();
const upload = multer();
app.use(express.static("public"));
//setting up body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile("/index.html");
});

app.post("/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  const data = [];
  //manual parsing of csv file instead of using csv-parser
  const lines = file.buffer.toString().split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const values = line.split(",");
    data.push(values);
  }
  //email validation system
  let valid = [];
  let invalid = [];
  for (let i = 1; i < data.length; i++) {
    let email = data[i][0].trimEnd();
    let verdict = validator.is_email_valid(email);
    if (verdict == true) {
      valid.push(email);
    } else {
      invalid.push(email);
    }
  }
  //creating HTML Table
  let htmlTable =
    "<body><link rel='stylesheet' href='/styles.css' /><h1 class='heading'>Emails</h1><table>";
  htmlTable +=
    "<tr><td><h2>Valid Emails<h2></td><td><h2>Invaild Emails</h2></td></tr>";
  for (let i = 0; i < valid.length; i++) {
    htmlTable += "<tr><td>";
    htmlTable += valid[i];
    htmlTable += "</td><td>";
    if (invalid[i] != undefined) {
      htmlTable += invalid[i];
    }
    htmlTable += "</td></tr>";
  }
  htmlTable += "</table></body>";
  res.sendFile(__dirname + "/filter.html");
});
app.listen(3000, function () {
  console.log("Server started");
});
