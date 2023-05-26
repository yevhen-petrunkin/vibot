const { updateProfile } = require("firebase/auth");

async function updateUserCompanyName(companyName, user) {
  try {
    await updateProfile(user, {
      displayName: companyName,
    });
    console.log("User Company Name updated");
    return true;
  } catch (error) {
    console.log(error.message);
    console.log("Failed to update User Company Name");
    return false;
  }
}

module.exports = updateUserCompanyName;
