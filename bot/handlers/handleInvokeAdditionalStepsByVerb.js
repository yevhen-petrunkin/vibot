const updateUserByEmail = require("../db-functions/updateUserByEmail");
const updateRemindersByEmail = require("../db-functions/updateRemindersByEmail");
const handleCredentials = require("./handleCredentials");
const checkSixMothsLaterDate = require("../helpers/specialistProactiveHelpers/checkSixMothsLaterDate");
const createPlanJoyReminder = require("../helpers/specialistProactiveHelpers/createPlanJoyReminder");

async function handleInvokeAdditionalStepsByVerb(verb, config) {
  const { context, credentials, state } = config;
  const { companyName, userEmail } = credentials;
  const userName = await context.activity.from.name;

  const isUserAuth = await handleCredentials(context.activity, credentials);
  if (isUserAuth) {
    switch (verb.toLowerCase()) {
      case "checkPlanJoy".toLowerCase():
      case "startCareerPlan".toLowerCase():
        const planData = { hasCareerPlan: true };
        await updateUserByEmail(userEmail, planData, config);
        const planJoyReminder = await createPlanJoyReminder(
          context,
          credentials
        );
        await updateRemindersByEmail(userEmail, planJoyReminder, config);
        break;

      case "helpPlan".toLowerCase():
        const helpPlanReminder = await checkSixMothsLaterDate(
          context,
          credentials
        );
        await updateRemindersByEmail(userEmail, helpPlanReminder, config);
        break;
    }
  }
}

module.exports = handleInvokeAdditionalStepsByVerb;
