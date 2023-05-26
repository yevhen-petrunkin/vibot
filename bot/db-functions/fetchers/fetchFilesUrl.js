const { collection, getDocs } = require("firebase/firestore");
const { db } = require("../../firebase");
const fetchFiles = require("./fetchFiles")

async function fetchFilesUrl(credentials) {
  const files = await fetchFiles(credentials);
  console.log("files");
  console.log(JSON.stringify(files, undefined, 2));
  let urls = files.map((item) => item.fileUrl);
  console.log("names");
  console.log(JSON.stringify(urls, undefined, 2));
  return await urls;
}

module.exports = fetchFilesUrl;
