const { specMenuEndpoints } = require("../sources/specMenuEndpoints");
const { managerMenuEndpoints } = require("../sources/managerMenuEndpoints");
const checkTransferToOtherCard = require("../helpers/checkTransferToOtherCard");

function defineNextVerb(verb, credentials) {
  if (
    verb.toLowerCase() === "seenFiles".toLowerCase() ||
    verb.toLowerCase() === "importantFilesList".toLowerCase()
  ) {
    if (credentials.userRole.toLowerCase() === "manager") {
      return "managerMenu";
    }
    if (credentials.userRole.toLowerCase() === "specialist") {
      return "specMenu";
    }
  }

  if (checkTransferToOtherCard(specMenuEndpoints, verb)) {
    return "specMenu";
  }
  if (checkTransferToOtherCard(managerMenuEndpoints, verb)) {
    return "managerMenu";
  }

  return verb;
}

module.exports = defineNextVerb;
