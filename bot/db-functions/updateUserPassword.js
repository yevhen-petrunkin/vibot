const { updatePassword } = require("firebase/auth");

async function updateUserPassword(newPassword, user) {
  try {
    await updatePassword(user, newPassword);
    console.log("User Password updated");
  } catch (error) {
    console.log(error.message);
    console.log("Failed to update User Password in firestore.");
  }
}

module.exports = updateUserPassword;
