const updateUserByEmail = require("../db-functions/updateUserByEmail");
const updateRemindersByEmail = require("../db-functions/updateRemindersByEmail");
const fetchUserStartingDateByEmail = require("../db-functions/fetchUserStartingDateByEmail");
const handleCredentials = require("./handleCredentials");
const checkSixMothsLaterDate = require("../helpers/specialistProactiveHelpers/checkSixMothsLaterDate");
const createPlanJoyReminder = require("../helpers/specialistProactiveHelpers/createPlanJoyReminder");
const createSpecGoalReminder = require("../helpers/specialistProactiveHelpers/createSpecGoalReminder");
const createMessageFromFromData = require("../helpers/specialistProactiveHelpers/createMessageFromFromData");
const createPlanReviewReminder = require("../helpers/managerProactiveHelpers/createPlanReviewReminder");

async function handleInvokeAdditionalStepsByVerb(verb, config) {
  const { context, credentials } = config;
  const { companyName, userEmail, managerEmail } = credentials;
  const contextData = context.activity;
  const userName = await contextData.from.name;
  let newVerb = verb;
  let reminder = null;
  let additionalReminder = null;

  const isUserAuth = await handleCredentials(contextData, credentials);
  if (isUserAuth) {
    switch (verb.toLowerCase()) {
      case "checkPlanJoy".toLowerCase():
      case "startCareerPlan".toLowerCase():
        const planData = { hasCareerPlan: true };
        await updateUserByEmail(userEmail, planData, config);
        reminder = await createPlanJoyReminder(context, credentials);
        await updateRemindersByEmail(userEmail, reminder, config);
        break;

      case "startPlan".toLowerCase():
        reminder = await createSpecGoalReminder(context, credentials);
        await updateRemindersByEmail(userEmail, reminder, config);
        break;

      case "helpPlan".toLowerCase():
        reminder = await checkSixMothsLaterDate(context, credentials);
        await updateRemindersByEmail(userEmail, reminder, config);
        const date = await fetchUserStartingDateByEmail(userEmail, companyName);
        additionalReminder = {
          userEmail,
          userName,
          verb: "activeManagerRemainderSpec",
          triggerDate: reminder.triggerDate,
          data: { startingDate: date },
          complete: false,
        };
        await updateRemindersByEmail(managerEmail, additionalReminder, config);
        break;

      case "managerFileSending".toLowerCase():
        reminder = await createPlanReviewReminder(context, credentials);
        await updateRemindersByEmail(userEmail, reminder, config);
        break;

      case "thankWaitNote".toLowerCase():
        newVerb = "answerUserNotJoy";
        reminder = await createMessageFromFromData(
          newVerb,
          contextData,
          credentials
        );
        await updateRemindersByEmail(managerEmail, reminder, config);
        break;

      case "thankCardDef".toLowerCase():
        newVerb = "answerUserNotPlan";
        reminder = await createMessageFromFromData(
          newVerb,
          contextData,
          credentials
        );
        await updateRemindersByEmail(managerEmail, reminder, config);
        break;
    }
  }
}

module.exports = handleInvokeAdditionalStepsByVerb;
