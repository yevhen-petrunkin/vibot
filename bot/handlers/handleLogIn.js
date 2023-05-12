const logInUser = require("../db-functions/logInUser");
const createUserCredentials = require("../helpers/createUserCredentials");

async function handleLogIn(contextData) {
  const { logInEmail } = contextData.value.action.data;
  console.log("handleLogIn:", contextData.value.action.data);
  try {
    const user = await logInUser(contextData, logInEmail);
    if (user) {
      console.log("User has been admitted.");
      return await createUserCredentials();
    }
    console.log("User has not been logged in!");
    return null;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
}
module.exports = handleLogIn;
