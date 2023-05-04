const postSecondaryUserData = require("../db-functions/postSecondaryUserData");

async function handleInvokeAdditionalStepsByVerb(verb, data) {
  switch (verb.toLowerCase()) {
    case "userdata":
      await postSecondaryUserData(data);
      break;
    default:
      return;
  }
}

module.exports = handleInvokeAdditionalStepsByVerb;
