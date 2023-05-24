const updateUserByEmail = require("../db-functions/updateUserByEmail");
const updateRemindersByEmail = require("../db-functions/updateRemindersByEmail");
const handleCredentials = require("./handleCredentials");
const checkSixMothsLaterDate = require("../helpers/specialistProactiveHelpers/checkSixMothsLaterDate");
const createPlanJoyReminder = require("../helpers/specialistProactiveHelpers/createPlanJoyReminder");
const createSpecGoalReminder = require("../helpers/specialistProactiveHelpers/createSpecGoalReminder");
const createPlanReviewReminder = require("../helpers/managerProactiveHelpers/createPlanReviewReminder");

async function handleInvokeAdditionalStepsByVerb(verb, config) {
  const { context, credentials, state } = config;
  const { companyName, userEmail, managerEmail, userRole } = credentials;
  const userName = await context.activity.from.name;
  let reminder = null;
  let additionalReminder = null;

  const isUserAuth = await handleCredentials(context.activity, credentials);
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
    }
  }
}

module.exports = handleInvokeAdditionalStepsByVerb;
