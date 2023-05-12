const { doc, getDoc } = require("firebase/firestore");
const { db } = require("../firebase");

async function fetchCompanyFiles(companyName) {
  const filesRef = doc(db, companyName, "companyFiles");
  try {
    const res = await getDoc(filesRef);
    const fileData = res.data();
    console.log("Company files fetched successfully.");
    return fileData.files;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    console.log("Failed to fetch company files.");
    return [];
  }
}

module.exports = fetchCompanyFiles;
