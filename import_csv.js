const express = require("express");
const multer = require("multer");
const validator = require("node-email-validation");
const dotenv = require("dotenv");
const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const app = express();
const upload = multer();
const OAuth2 = google.auth.OAuth2;
dotenv.config();
app.use(express.static("public"));
//setting up body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let valid = [];
let invalid = [];
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

  for (let i = 1; i < data.length; i++) {
    let email = data[i][0].trimEnd();
    let verdict = validator.is_email_valid(email);
    if (verdict) {
      valid.push(email);
    } else {
      invalid.push(email);
    }
  }
  //creating HTML Table
  let htmlTable =
    "<h1 class='heading'>Emails</h1><a href='/email'><button type='button'>Continue</button></a><table>";
  htmlTable +=
    "<tr><td><h2>Valid Emails" +
    valid.length +
    "<h2></td><td><h2>Invaild Emails" +
    (invalid.length - 1) +
    "</h2></td></tr>";
  for (let i = 0; i < valid.length; i++) {
    htmlTable += "<tr><td>";
    htmlTable += valid[i];
    htmlTable += "</td><td>";
    if (invalid[i] != undefined) {
      htmlTable += invalid[i];
    }
    htmlTable += "</td></tr>";
  }
  htmlTable += "</table>";
  // res.sendFile(__dirname + "/public/filter.html");
  res.send(htmlTable);
});

app.get("/email", function (req, res) {
  res.sendFile(__dirname + "/email.html");
});
app.post("/email", async function (req, res) {
  // const email = req.body.email;

  const sub = req.body.subject;
  const text = req.body.text;
  for (let i = 0; i < valid.length; i++) {
    const email = valid[i];
    const createTransporter = async () => {
      // 1
      const oauth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
      );

      // 2
      oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN,
      });

      const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
          if (err) {
            reject("Failed to create access token :( " + err);
          }
          resolve(token);
        });
      });

      // 3
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.EMAIL_IS,
          accessToken,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
        },
      });

      // 4
      return transporter;
    };

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_IS,
        pass: process.env.PASS_IS,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    });

    // e-mail option
    let mailOptions = {
      from: "helixjoe13927@gmail.com",
      to: email,
      subject: sub,
      text: text,
    };

    try {
      // Get response from the createTransport
      let emailTransporter = await createTransporter();

      // Send email
      emailTransporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          // failed block
          console.log(error);
        } else {
          // Success block

          return console.log("Email sent: " + info.response);
        }
      });
    } catch (error) {
      return console.log(error);
    }
  }
  res.send("Messages sent succesfully");
});
app.listen(3000, function () {
  console.log("Server started");
});
