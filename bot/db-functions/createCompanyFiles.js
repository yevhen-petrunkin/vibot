const { doc, setDoc } = require("firebase/firestore");
const { db } = require("../firebase");

async function createCompanyFiles(companyName) {
  try {
    const filesData = { specialFiles: [] };
    const filesRef = doc(db, companyName, "companyFiles");

    setDoc(filesRef, filesData);
    console.log("Company Files Created");
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = createCompanyFiles;
