const { doc, arrayUnion, updateDoc } = require("firebase/firestore");
const { db } = require("../firebase");

async function updateCompanyFiles(file, companyName) {
  const filesRef = doc(db, companyName, "companyFiles");
  try {
    await updateDoc(filesRef, { files: arrayUnion(file) });
    console.log("File added to company files.");
    return true;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    console.log("Failed to add file to company files.");
    return false;
  }
}

module.exports = updateCompanyFiles;

// --- file must be an object that looks like this: !!!!!!!!!!!!!!
// {
//   fileName: "",
//   fileLink: ""
// };
