const createAdminAccount = require("./createAdminAccount");
const createCompanyInfo = require("./createCompanyInfo");
const createAdminAsUser = require("./createAdminAsUser");
const createCompanyFiles = require("./createCompanyFiles");
const updateUserCompanyName = require("./updateUserCompanyName");
const createAdminCredentials = require("../helpers/createAdminCredentials");

async function createNewCompany(contextData) {
  const { companyName } = contextData.value.action.data;
  try {
    const user = await createAdminAccount(contextData);
    if (user) {
      await updateUserCompanyName(companyName, user);
      await createCompanyInfo(contextData);
      await createAdminAsUser(contextData, user);
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
