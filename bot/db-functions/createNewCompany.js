const createAdminAccount = require("./createAdminAccount");
const createCompanyInfo = require("./createCompanyInfo");
const createAdminAsUser = require("./createAdminAsUser");
const createCompanyFiles = require("./createCompanyFiles");
const updateUserCompanyName = require("./updateUserCompanyName");
const createAdminCredentials = require("../helpers/createAdminCredentials");

async function createNewCompany(context) {
  const { companyName } = context.activity.value.action.data;
  try {
    const user = await createAdminAccount(context);
    if (user) {
      await updateUserCompanyName(companyName, user);
      await createCompanyInfo(context.activity);
      await createAdminAsUser(context.activity, user);
      await createCompanyFiles(companyName);

      console.log("All operations completed successfully.");

      return createAdminCredentials();
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
}

module.exports = createNewCompany;
