const { doc, deleteDoc } = require("firebase/firestore");
const { db } = require("../firebase");

async function deleteUserAsStaffByEmail(userEmail, companyName) {
  const userRef = doc(db, companyName, "companyUsers", "users", userEmail);
  try {
    const res = await deleteDoc(userRef);
    console.log("User has been successfully deleted from company members.");
    return res.data();
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    console.log("Failed to delete user from company members.");
    return null;
  }
}

module.exports = deleteUserAsStaffByEmail;
