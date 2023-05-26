const { specMenuEndpoints } = require("../sources/specMenuEndpoints");
const { managerMenuEndpoints } = require("../sources/managerMenuEndpoints");
const checkTransferToOtherCard = require("../helpers/checkTransferToOtherCard");

function defineNextVerb(verb, credentials) {
  if (verb === "importantFilesList") {
    if (credentials.userRole === "manager") {
      if (checkTransferToOtherCard(managerMenuEndpoints, verb)) {
        return "managerMenu";
      }
    }
    if (credentials.userRole === "specialist") {
      if (checkTransferToOtherCard(specMenuEndpoints, verb)) {
        return "specMenu";
      }
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
