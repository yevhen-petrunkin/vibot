const logInUser = require("../db-functions/logInUser");
const createUserCredentials = require("../helpers/createUserCredentials");

const handleAdminReplyMessages = require("./handleAdminReplyMessages");

async function handleLogIn(context, credentials) {
  try {
    const { logInEmail } = context.activity.value.action.data;
    console.log("handleLogIn:", context.activity.value.action.data);

    const user = await logInUser(context.activity, logInEmail);

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
    const newVerb = "noEntryMessage";

    await handleAdminReplyMessages(newVerb, context, credentials);
    return null;
  }
}
module.exports = handleLogIn;
