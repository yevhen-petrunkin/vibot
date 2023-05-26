const signUpUser = require("../db-functions/signUpUser");
const updateUserPassword = require("../db-functions/updateUserPassword");
const updateUserNameAndTeamsIdByEmail = require("../db-functions/updateUserNameAndTeamsIdByEmail");
const logInUser = require("../db-functions/logInUser");
const createUserCredentials = require("../helpers/createUserCredentials");
const handleAdminReplyMessages = require("./handleAdminReplyMessages");

async function handleSignUp(context, credentials) {
  try {
    const newPassword = context.activity.from.id;

    const user = await signUpUser(context.activity);

    if (user) {
      await updateUserPassword(newPassword, user);
      await updateUserNameAndTeamsIdByEmail(
        user.email,
        context.activity,
        user.displayName
      );
      await logInUser(context.activity, user.email);
      console.log("User has been admitted.");
      return await createUserCredentials();
    }
    console.log("User has not been signed up!");

    return null;
  } catch (error) {
    console.log(error.message);
    const newVerb = "noEntryMessage";

    await handleAdminReplyMessages(newVerb, context, credentials);
    return null;
  }
}
module.exports = handleSignUp;
