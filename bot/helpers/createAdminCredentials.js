const { getAuth } = require("firebase/auth");

const auth = getAuth();

function createAdminCredentials() {
  try {
    const credentials = {
      companyName: auth.currentUser.displayName,
      userEmail: auth.currentUser.email,
      userRole: "admin",
      stage: "admin",
    };
    console.log("Admin Credentials created!");
    return credentials;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = createAdminCredentials;
