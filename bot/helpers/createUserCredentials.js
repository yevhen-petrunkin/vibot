const { getAuth } = require("firebase/auth");
const fetchUserByEmail = require("../db-functions/fetchUserByEmail");

const auth = getAuth();

async function createUserCredentials() {
  const userEmail = auth.currentUser.email;
  const companyName = auth.currentUser.displayName;
  try {
    const userData = await fetchUserByEmail(userEmail, companyName);
    if (userData) {
      const credentials = {
        companyName,
        userEmail,
        userRole: userData.userRole,
        stage: userData.stage,
      };
      console.log("User Credentials created!");
      return credentials;
    }
    console.log("user Credentials have not been created!");
    return null;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = createUserCredentials;
