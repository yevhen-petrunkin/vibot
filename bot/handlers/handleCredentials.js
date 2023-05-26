const observeAuthState = require("../db-functions/observeAuthState");
const logInUser = require("../db-functions/logInUser");

async function handleCredentials(contextData, credentials) {
  const user = await observeAuthState();
  try {
    if (user) {
      console.log("User is ready.");
      return user;
    } else {
      console.log("No user logged. Trying to log user...");
      const loggedUser = await logInUser(contextData, credentials.userEmail);

      return loggedUser;
    }
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

module.exports = handleCredentials;
