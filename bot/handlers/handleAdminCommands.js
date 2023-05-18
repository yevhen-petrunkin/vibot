const createNewUser = require("../db-functions/createNewUser");
const logInUser = require("../db-functions/logInUser");
const updatePerfReview = require("../db-functions/updatePerformanceReviewDates");
const updateUserByEmail = require("../db-functions/updateUserByEmail");
const handleCredentials = require("./handleCredentials");

async function handleAdminCommands(verb, context, credentials, state) {
  const { companyName, userEmail } = credentials;

  // let thisUserEmail = null;
  const isUserAuth = await handleCredentials(context.activity, credentials);
  switch (verb.toLowerCase()) {
    case "userCreated".toLowerCase():
      if (isUserAuth) {
        await createNewUser(context, credentials);
        await logInUser(context.activity, userEmail);
      }
      break;
    case "confirmUpdatePerfReview".toLowerCase():
      const dateDataStart = context.activity.value.action.data.perfDateStart;
      const dateDataEnd = context.activity.value.action.data.perfDateEnd;
      const dateData = {
        firstPerfReviewPeriod: {
          startPerfReviewDate: dateDataStart,
          endPerfReviewDate: dateDataEnd,
        },
      };
      console.log(dateDataStart, dateDataEnd);
      if (isUserAuth) {
        await updatePerfReview(dateData, companyName);
      }
      break;

    // case "updateUser".toLowerCase():
    //   const thisUserEmail = context.activity.value.action.data.updateEmail;
    //   console.log(thisUserEmail);
    //   return thisUserEmail;

    case "updateUserMessage".toLowerCase():
      const thisUserEmail = context.activity.value.action.data.updateEmail;
      const startDate = context.activity.value.action.data.startingDateUpdate;
      const userRole = context.activity.value.action.data.userRoleChange;
      let userData = {};
      console.log(thisUserEmail);

      if (isUserAuth) {
        if (!startDate) {
          userData = { userRole: userRole };
        }
        if (!userRole) {
          userData = { startingDate: startDate };
        }
        if (userRole && startDate) {
          userData = { startingDate: startDate, userRole: userRole };
        }
        console.log(userData, thisUserEmail);
        await updateUserByEmail(thisUserEmail, userData, companyName);
      }
      break;
  }
}

module.exports = handleAdminCommands;
