const { doc, updateDoc } = require("firebase/firestore");
const { db } = require("../firebase");
const handleAdminReplyMessages = require("../handlers/handleAdminReplyMessages");

async function updateUserByEmail(
  updateEmail,
  userData,
  { context, credentials }
) {
  const userRef = doc(
    db,
    credentials.companyName,
    "companyUsers",
    "users",
    updateEmail
  );

  try {
    await updateDoc(userRef, {
      ...userData,
    });
    console.log("User Data updated in firestore.", userData);
    const newVerb = "userUpdated";
    await handleAdminReplyMessages(newVerb, context, credentials);

    return true;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    console.log("Failed to update user Data in firestore.");
    return false;
  }
}

module.exports = updateUserByEmail;

// --- userEmail can be an email of current user or any other user's email whose info you need to get: !!!!!!!!!!!!!!
// --- userData must be an object with pairs key: value, for example: !!!!!!!!!!!!!!
// {
//   managerEmail: "manager@mail.com",
//   hasCareerPlan: true,
// };

// etc.
