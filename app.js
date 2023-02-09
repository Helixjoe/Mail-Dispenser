const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/", function (req, res) {
  res.sendFile("/index.html");
});
// Post route to handle retrieving data from HTML form to server
app.post("/sendMail", function (req, res) {
  const email = req.body.email;
  console.log(email);
  res.send("Things are recieved " + email);
});
app.listen(3000, function () {
  console.log("Server is running successfully on port 3000");
});
