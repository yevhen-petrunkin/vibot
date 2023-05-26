const createUserAccount = require("./createUserAccount");
const createUserAsStaff = require("./createUserAsStaff");
const updateUserCompanyName = require("./updateUserCompanyName");
const handleAdminReplyMessages = require("../handlers/handleAdminReplyMessages");

async function createNewUser(context, credentials) {
  const { companyName } = credentials;

  try {
    const user = await createUserAccount(context, credentials);
    if (user) {
      await updateUserCompanyName(companyName, user);
      await createUserAsStaff(context.activity, user, companyName);
      console.log("All operations completed successfully.");
      const newVerb = "userCreated";
      await handleAdminReplyMessages(newVerb, context, credentials);
    }
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = createNewUser;
