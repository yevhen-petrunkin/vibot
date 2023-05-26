const { doc, updateDoc } = require("firebase/firestore");
const { db } = require("../firebase");

async function updateUserNameAndTeamsIdByEmail(
  updateEmail,
  contextData,
  companyName
) {
  const teamsId = contextData.from.id;
  const userName = contextData.from.name;
  const userData = { teamsId, userName };
  const userRef = doc(db, companyName, "companyUsers", "users", updateEmail);

  try {
    await updateDoc(userRef, {
      ...userData,
    });
    console.log("UserName and teamsId updated in firestore.");
  } catch (error) {
    console.log(error.message);
    console.log("Failed to update User Name and teamsId in firestore.");
  }
}

module.exports = updateUserNameAndTeamsIdByEmail;
