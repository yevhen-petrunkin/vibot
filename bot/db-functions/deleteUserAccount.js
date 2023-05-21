const { deleteUser } = require("firebase/auth");
const { auth } = require("../firebase");

async function deleteUserAccount() {
  try {
    const user = auth.currentUser;
    await deleteUser(user);
    console.log("User account has been deleted successfully.");
    return true;
  } catch (error) {
    console.log(error.message);
    console.log("Failed to delete user account.");
    return false;
  }
}

module.exports = deleteUserAccount;
