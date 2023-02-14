const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
//sendgrid mail service
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//creating public folder
app.use(express.static("public"));
//body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/", function (req, res) {
  res.sendFile("/index.html");
});
// Post route to handle retrieving data from HTML form to server
app.post("/sendMail", function (req, res) {
  const fromEmail = req.body.fromEmail;
  const toEmail = req.body.toEmail;
  res.send("Things are sent");
  const msg = {
    to: toEmail, // Change to your recipient
    from: fromEmail, // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(3000, function () {
  console.log("Server is running successfully on port 3000");
});
