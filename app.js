// // Reading data from file
// const inputElement = document.getElementById(".fileInput");
// inputElement.addEventListener("change", handleFileSelect, false);
// function handfiles() {
//   const fileList = this.files;
// }
// const numFiles = fileList.length;
// console.log(numFiles);

const express = require("express");

const app = express();

app.listen(3000, function () {
  console.log("Server is running successfully on port 3000");
});
