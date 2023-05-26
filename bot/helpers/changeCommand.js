const splitSpecialistAndManager = require("./splitSpecialistAndManager");

async function changeCommand(verb, config) {
  const { credentials } = config;

  switch (verb.toLowerCase()) {
    case "determineSpecPath".toLowerCase():
      return await splitSpecialistAndManager(credentials);

    case "seenFiles".toLowerCase():
      if (credentials.userRole.toLowerCase() === "manager") {
        return "managerMenu";
      }

      if (credentials.userRole.toLowerCase() === "specialist") {
        return "specMenu";
      }
      break;

    default:
      return verb;
  }
}

module.exports = changeCommand;
