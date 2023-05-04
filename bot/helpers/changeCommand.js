const splitSpecialistAndManager = require("./splitSpecialistAndManager");

function changeCommand(verb, data) {
  if (verb.toLowerCase() === "gotocard") {
    const word = data.value.action.data.neededCard;
    return word;
  }

  if (
    verb.toLowerCase() === "userdataspecialist" ||
    verb.toLowerCase() === "userdatamanager"
  ) {
    const newVerb = splitSpecialistAndManager(verb);
    return newVerb.toLowerCase();
  }

  // if (verb === "determineSpecPath") {
  //   const newVerb = splitSpecialistAndManager(verb);
  //   return newVerb;
  // }
  return verb.toLowerCase();
}

module.exports = changeCommand;
