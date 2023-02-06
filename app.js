// Reading data from file
const inputElement = document.getElementById(".fileInput");
inputElement.addEventListener("change", handleFileSelect, false);
function handfiles() {
  const fileList = this.files;
}
const numFiles = fileList.length;
console.log(numFiles);
