const splitSpecialistAndManager = require("./splitSpecialistAndManager");

function changeCommand(verb) {
  if (verb === "userDataSpecialist" || verb === "userDataManager") {
    const newVerb = splitSpecialistAndManager(verb);
    return newVerb;
  }
  // if (verb === "determineSpecPath") {
  //   const newVerb = splitSpecialistAndManager(verb);
  //   return newVerb;
  // }
  return verb;
}

module.exports = changeCommand;
