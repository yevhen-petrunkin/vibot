const { doc, setDoc } = require("firebase/firestore");
const { db } = require("../firebase");
const handleAdminReplyMessages = require("../handlers/handleAdminReplyMessages");

async function createNewCompanyFile(context, credentials) {
  const { fileAssign, fileName, fileUrl } = context.activity.value.action.data;
  const fileData = { fileName, fileUrl };
  const fileAssignArr = fileAssign.split(",");
  console.log("File Data: ", fileData);
  let fileRef = null;

  try {
    if (
      fileAssignArr.some(
        (file) => file.toLowerCase() === "specialists".toLowerCase()
      )
    ) {
      fileRef = doc(
        db,
        credentials.companyName,
        "companyFiles",
        "specialistFiles",
        fileName
      );
      await setDoc(fileRef, fileData);
      console.log("File added to specialist files.");
    }

    if (
      fileAssignArr.some(
        (file) => file.toLowerCase() === "managers".toLowerCase()
      )
    ) {
      fileRef = doc(
        db,
        credentials.companyName,
        "companyFiles",
        "managerFiles",
        fileName
      );
      await setDoc(fileRef, fileData);
      console.log("File added to manager files.");
    }
    const newVerb = "fileDownloaded";
    await handleAdminReplyMessages(newVerb, context, credentials);
    return true;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    console.log("Failed to add file to company files.");
    return false;
  }
}

module.exports = createNewCompanyFile;
