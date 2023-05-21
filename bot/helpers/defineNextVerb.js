const { specMenuEndpoints } = require("../sources/specMenuEndpoints");
const checkTransferToOtherCard = require("../helpers/checkTransferToOtherCard");

function defineNextVerb(verb) {
  if (checkTransferToOtherCard(specMenuEndpoints, verb)) {
    return "specMenu";
  }

  return verb;
}

module.exports = defineNextVerb;
