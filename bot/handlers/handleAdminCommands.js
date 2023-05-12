const createNewUser = require("../db-functions/createNewUser");
const logInUser = require("../db-functions/logInUser");
const handleCredentials = require("./handleCredentials");

async function handleAdminCommands(verb, context, credentials) {
  const { companyName, userEmail } = credentials;
  switch (verb.toLowerCase()) {
    case "userCreated".toLowerCase():
      const isUserAuth = await handleCredentials(context.activity, credentials);
      if (isUserAuth) {
        await createNewUser(context, credentials);
        await logInUser(context.activity, userEmail);
      }
      break;
  }
}

module.exports = handleAdminCommands;
