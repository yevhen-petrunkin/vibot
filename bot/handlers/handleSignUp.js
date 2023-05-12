const signUpUser = require("../db-functions/signUpUser");
const updateUserPassword = require("../db-functions/updateUserPassword");
const updateUserNameAndTeamsIdByEmail = require("../db-functions/updateUserNameAndTeamsIdByEmail");
const logInUser = require("../db-functions/logInUser");
const createUserCredentials = require("../helpers/createUserCredentials");

async function handleSignUp(contextData) {
  const newPassword = contextData.from.id;
  try {
    const user = await signUpUser(contextData);
    if (user) {
      await updateUserPassword(newPassword, user);
      await updateUserNameAndTeamsIdByEmail(
        user.email,
        contextData,
        user.displayName
      );
      await logInUser(contextData, user.email);
      console.log("User has been admitted.");
      return await createUserCredentials();
    }
    console.log("User has not been signed up!");
    return null;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
}
module.exports = handleSignUp;
