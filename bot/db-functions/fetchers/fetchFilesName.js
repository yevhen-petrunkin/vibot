const { collection, getDocs } = require("firebase/firestore");
const { db } = require("../../firebase");
const fetchFiles = require("./fetchFiles")

async function fetchFilesName(credentials) {
  const files = await fetchFiles(credentials);
  console.log("files");
  console.log(JSON.stringify(files, undefined, 2));
  let names = files.map((item) => item.fileName);
  console.log("names");
  console.log(JSON.stringify(names, undefined, 2));
  return names;
}

module.exports = fetchFilesName;
