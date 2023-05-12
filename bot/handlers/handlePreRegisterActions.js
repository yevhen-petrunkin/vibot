const handleAdminReplyMessages = require("./handleAdminReplyMessages");
const createNewCompany = require("../db-functions/createNewCompany");
const showAdaptiveCardByData = require("../actions/showAdaptiveCardByData");
const handleLogIn = require("./handleLogIn");
const handleSignUp = require("./handleSignUp");
const {
  rawCreateCompanyCard,
  rawSignUpCard,
  rawLogInCard,
} = require("../adaptiveCards/cardIndex");

async function handlePreRegisterActions(verb, context, credentials) {
  const contextData = context.activity;
  let isTriggered = true;

  switch (verb.toLowerCase()) {
    case "createCompany".toLowerCase():
      await showAdaptiveCardByData(rawCreateCompanyCard, context);
      return { isTriggered, credentials };

    case "companyCreated".toLowerCase():
      const postCompanyCreatedCredentials = await createNewCompany(contextData);
      if (postCompanyCreatedCredentials) {
        const companyReadyVerb = "companyReady";
        await handleAdminReplyMessages(
          companyReadyVerb,
          context,
          postCompanyCreatedCredentials
        );
        return { isTriggered, credentials: postCompanyCreatedCredentials };
      }
      console.log(
        "Something wrong with creating company. No Credentials Received."
      );
      return { isTriggered, credentials };

    case "signUp".toLowerCase():
      await showAdaptiveCardByData(rawSignUpCard, context);
      return { isTriggered, credentials };

    case "logIn".toLowerCase():
      await showAdaptiveCardByData(rawLogInCard, context);
      return { isTriggered, credentials };

    case "submitSignUp".toLowerCase():
      const signUpCredentials = await handleSignUp(contextData);
      return { isTriggered, credentials: signUpCredentials };

    case "submitLogIn".toLowerCase():
      const logInCredentials = await handleLogIn(contextData);
      console.log("handlePreRegisterActions:", contextData.value.action.data);
      return { isTriggered, credentials: logInCredentials };

    default:
      return { isTriggered: !isTriggered, credentials };
  }
}

module.exports = handlePreRegisterActions;
