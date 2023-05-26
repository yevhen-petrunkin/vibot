const createNewUser = require("../db-functions/createNewUser");
const logInUser = require("../db-functions/logInUser");
const updatePerformanceReviewDates = require("../db-functions/updatePerformanceReviewDates");
const updateUserByEmail = require("../db-functions/updateUserByEmail");
const createNewCompanyFile = require("../db-functions/createNewCompanyFile");
const deleteUser = require("../db-functions/deleteUser");
const handleCredentials = require("./handleCredentials");

async function handleAdminCommands(verb, config) {
  const { context, credentials, state } = config;
  const { companyName, userEmail } = credentials;

  const isUserAuth = await handleCredentials(context.activity, credentials);
  if (isUserAuth) {
    switch (verb.toLowerCase()) {
      case "createUserMessage".toLowerCase():
        await createNewUser(context, credentials);
        await logInUser(context.activity, userEmail);
        break;

      case "confirmUpdatePerfReview".toLowerCase():
        const dateData = context.activity.value.action.data;
        console.log("Perf Dates :", dateData);
        await updatePerformanceReviewDates(dateData, companyName);
        break;

      case "updateUserMessage".toLowerCase():
        const userData = context.activity.value.action.data;

        const normalizedData = {
          startingDate: userData.startingDateUpdate,
          userRole: userData.userRoleChange,
          managerEmail: userData.updateEmailManager,
        };

        const filteredData = Object.entries(normalizedData).reduce(
          (aggr, entry) => {
            if (entry[1]) {
              aggr[entry[0]] = entry[1];
              return aggr;
            } else {
              return aggr;
            }
          },
          {}
        );

        console.log("filteredData: ", filteredData);

        await updateUserByEmail(userData.updateEmail, filteredData, config);
        break;

      case "downloadFileMessage".toLowerCase():
        await createNewCompanyFile(context, credentials);
        break;

      case "delMessage".toLowerCase():
        const { delEmail } = context.activity.value.action.data;
        await deleteUser(delEmail, context, credentials);
        break;

      default:
        break;
    }
  }
  return;
}

module.exports = handleAdminCommands;
