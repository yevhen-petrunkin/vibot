const updateUserByEmail = require("../db-functions/updateUserByEmail");
const handleCredentials = require("./handleCredentials");

async function handleInvokeAdditionalStepsByVerb(verb, config) {
  const { context, credentials, state } = config;
  const { companyName, userEmail } = credentials;

  const isUserAuth = await handleCredentials(context.activity, credentials);
  switch (verb.toLowerCase()) {
    case "checkPlanJoy".toLowerCase():
    case "startCareerPlan".toLowerCase():
      if (isUserAuth) {
        const planData = { hasCareerPlan: true };
        updateUserByEmail(userEmail, planData, config);
      }
      break;
  }
}

module.exports = handleInvokeAdditionalStepsByVerb;
