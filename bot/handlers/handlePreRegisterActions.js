const handleAdminReplyMessages = require("./handleAdminReplyMessages");
const handleProactiveMessages = require("./handleProactiveMessages");
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
      const postCompanyCreatedCredentials = await createNewCompany(context);
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
      const signUpCredentials = await handleSignUp(context, credentials);
      if (signUpCredentials) {
        const submitSignUpVerb = "submitReady";
        await handleAdminReplyMessages(
          submitSignUpVerb,
          context,
          signUpCredentials
        );
        console.log("handlePreRegisterActions:", contextData.value.action.data);
        return { isTriggered, credentials: signUpCredentials };
      }
      return { isTriggered, credentials };

    case "submitLogIn".toLowerCase():
      const logInCredentials = await handleLogIn(context, credentials);
      if (logInCredentials) {
        const submitLogInVerb = "submitReady";
        await handleAdminReplyMessages(
          submitLogInVerb,
          context,
          logInCredentials
        );
        console.log("handlePreRegisterActions:", contextData.value.action.data);
        const reminders = await handleProactiveMessages(
          context,
          logInCredentials
        );
        return { isTriggered, credentials: logInCredentials, reminders };
      }
      return { isTriggered, credentials };

    default:
      return { isTriggered: !isTriggered, credentials };
  }
}

module.exports = handlePreRegisterActions;
