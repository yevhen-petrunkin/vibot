const postSecondaryUserData = require("../db-functions/postSecondaryUserData");
const postCustomUserData = require("../db-functions/postCustomUserData");

async function handleInvokeAdditionalStepsByVerb(verb, data) {
  const userId = data.from.id;

  switch (verb.toLowerCase()) {
    case "managerEmail".toLowerCase():
      const specialist = { role: "Specialist" };
      await postSecondaryUserData(data);
      await postCustomUserData(specialist, userId);
      break;
    case "managerFileSending".toLowerCase():
      const manager = { role: "Manager" };
      await postSecondaryUserData(data);
      await postCustomUserData(manager, userId);
      break;
    case "startPlan".toLowerCase() || "helpPlan".toLowerCase():
      await postSecondaryUserData(data);
      break;
    default:
      return;
  }
}

module.exports = handleInvokeAdditionalStepsByVerb;
