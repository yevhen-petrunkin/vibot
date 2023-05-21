const splitSpecialistAndManager = require("./splitSpecialistAndManager");

async function changeCommand(verb, config) {
  const { context, credentials } = config;
  const contextData = context.activity;

  // const teamsId = contextData.from.id;
  // const userName = contextData.from.name;
  // const formData = contextData.value.action.data;

  switch (verb.toLowerCase()) {
    case "determineSpecPath".toLowerCase():
      return await splitSpecialistAndManager(credentials);

    default:
      return verb;
  }
}

module.exports = changeCommand;
