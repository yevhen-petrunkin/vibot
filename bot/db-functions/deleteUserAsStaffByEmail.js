const { doc, deleteDoc } = require("firebase/firestore");
const { db } = require("../firebase");

async function deleteUserAsStaffByEmail(userEmail, companyName) {
  const userRef = doc(db, companyName, "companyUsers", "users", userEmail);
  try {
    await deleteDoc(userRef);
    console.log("User has been successfully deleted from company members.");
    return true;
  } catch (error) {
    console.log(error.message);
    console.log("Failed to delete user from company members.");
    return false;
  }
}

module.exports = deleteUserAsStaffByEmail;
