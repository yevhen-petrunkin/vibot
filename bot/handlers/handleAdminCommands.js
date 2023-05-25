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
        const {
          updateEmail,
          startingDateUpdate,
          userRoleChange,
          updateEmailManager,
        } = context.activity.value.action.data;

        let userData = {};

        if (!startingDateUpdate) {
          userData = {
            userRole: userRoleChange,
            managerEmail: updateEmailManager,
          };
        }
        if (!userRoleChange) {
          userData = {
            startingDate: startingDateUpdate,
            managerEmail: updateEmailManager,
          };
        }
        if (!updateEmailManager) {
          userData = {
            startingDate: startingDateUpdate,
            userRole: userRoleChange,
          };
        }
        if (!startingDateUpdate && !updateEmailManager) {
          userData = {
            userRole: userRoleChange,
          };
        }
        if (!userRoleChange && !updateEmailManager) {
          userData = {
            startingDate: startingDateUpdate,
          };
        }
        if (!userRoleChange && !startingDateUpdate) {
          userData = {
            managerEmail: updateEmailManager,
          };
        }
        if (userRoleChange && startingDateUpdate && updateEmailManager) {
          userData = {
            startingDate: startingDateUpdate,
            userRole: userRoleChange,
            managerEmail: updateEmailManager,
          };
        }

        await updateUserByEmail(updateEmail, userData, config);
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
