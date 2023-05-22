const fetchUserByEmail = require("./fetchUserByEmail");
const logInWithTeamsId = require("./logInWithTeamsId");
const logInUser = require("./logInUser");
const deleteUserAccount = require("./deleteUserAccount");
const deleteUserAsStaffByEmail = require("./deleteUserAsStaffByEmail");
const handleAdminReplyMessages = require("../handlers/handleAdminReplyMessages");

async function deleteUser(targetEmail, context, credentials) {
  const { companyName, userEmail } = credentials;

  try {
    const { teamsId } = await fetchUserByEmail(targetEmail, companyName);
    if (teamsId) {
      const user = await logInWithTeamsId(teamsId, targetEmail);
      if (user) {
        await deleteUserAccount();
        await logInUser(context.activity, userEmail);
        await deleteUserAsStaffByEmail(targetEmail, companyName);
        console.log("Target user has been deleted completely.");
        const newVerb = "userDeleted";
        await handleAdminReplyMessages(newVerb, context, credentials);

        return true;
      } else {
        console.log("Did not log in as target user.");
        return false;
      }
    } else {
      console.log("Target user does not have registered teams id yet.");
      return false;
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    console.log("Failed to delete target user. Something went wrong.");
    return false;
  }
}
module.exports = deleteUser;
