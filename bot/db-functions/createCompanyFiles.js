const { doc, setDoc } = require("firebase/firestore");
const { db } = require("../firebase");

async function createCompanyFiles(companyName) {
  const filesData = { specialFiles: [] };
  const filesRef = doc(db, companyName, "companyFiles");

  setDoc(filesRef, filesData);
  console.log("Company Files Created");
}

module.exports = createCompanyFiles;
