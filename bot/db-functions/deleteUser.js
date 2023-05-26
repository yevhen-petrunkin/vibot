const fetchUserByEmail = require("./fetchUserByEmail");
const logInWithTeamsId = require("./logInWithTeamsId");
const logInUser = require("./logInUser");
const deleteUserAccount = require("./deleteUserAccount");
const deleteUserAsStaffByEmail = require("./deleteUserAsStaffByEmail");
const handleAdminReplyMessages = require("../handlers/handleAdminReplyMessages");

async function deleteUser(targetEmail, context, credentials) {
  try {
    const { companyName, userEmail } = credentials;
    let newVerb = "";

    if (targetEmail.toLowerCase() === userEmail.toLowerCase()) {
      console.log("User cannot delete himself.");
      newVerb = "noDeleteSelf";
      await handleAdminReplyMessages(newVerb, context, credentials);
      return false;
    }
    const { teamsId } = await fetchUserByEmail(targetEmail, companyName);
    if (teamsId) {
      const user = await logInWithTeamsId(teamsId, targetEmail);
      if (user) {
        await deleteUserAccount();
        await logInUser(context.activity, userEmail);
        await deleteUserAsStaffByEmail(targetEmail, companyName);
        console.log("Target user has been deleted completely.");
        newVerb = "userDeleted";
        await handleAdminReplyMessages(newVerb, context, credentials);

        return true;
      } else {
        console.log("Did not log in as target user.");
        newVerb = "userNotDeleted";
        await handleAdminReplyMessages(newVerb, context, credentials);
        return false;
      }
    } else {
      console.log("Target user does not have registered teams id yet.");
      newVerb = "userNotRegistered";
      await handleAdminReplyMessages(newVerb, context, credentials);
      return false;
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    console.log("Failed to delete target user. Something went wrong.");
    newVerb = "userNotDeleted";
    await handleAdminReplyMessages(newVerb, context, credentials);
    return false;
  }
}
module.exports = deleteUser;
