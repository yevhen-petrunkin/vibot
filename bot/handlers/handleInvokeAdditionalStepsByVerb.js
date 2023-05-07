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
    case "ascReasonDecline".toLowerCase():
      let whyNoPlan = data.value.action.data.reasonDecline;
      if (whyNoPlan === "4") {
        whyNoPlan = data.value.action.data.yourOptionReasonDecline;
      }
      const reasonWhyNoPlan = { reasonWhyNoPlan: `${whyNoPlan}` };
      await postSecondaryUserData(data);
      await postCustomUserData(reasonWhyNoPlan, userId);
      break;
    case "ascNotJoy".toLowerCase():
      let whyNotJoyPlan = data.value.action.data.whyNotJoy;
      if (whyNotJoyPlan === "4") {
        whyNotJoyPlan = data.value.action.data.yourOptionWhyNotJoy;
      }
      const reasonWhyNotJoy = { reasonWhyNotJoy: `${whyNotJoyPlan}` };
      console.log(reasonWhyNotJoy);
      await postSecondaryUserData(data);
      await postCustomUserData(reasonWhyNotJoy, userId);
      break;
    default:
      return;
  }
}

module.exports = handleInvokeAdditionalStepsByVerb;
