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
    console.log("User Data updated in firestore.");
    const newVerb = "userUpdated";
    await handleAdminReplyMessages(newVerb, context, credentials);

    return true;
  } catch (error) {
    console.log(error.message);
    console.log("Failed to update user Data in firestore.");
    const newVerb = "userNotUpdated";
    await handleAdminReplyMessages(newVerb, context, credentials);
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
