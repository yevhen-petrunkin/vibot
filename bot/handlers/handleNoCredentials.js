const observeAuthState = require("../db-functions/observeAuthState");
const fetchUserByEmail = require("../db-functions/fetchUserByEmail");
const { rawSuggestAuthCard } = require("../adaptiveCards/cardIndex");
const showAdaptiveCardByData = require("../actions/showAdaptiveCardByData");

async function handleNoCredentials(context) {
  const user = await observeAuthState();
  if (user) {
    const { userRole, stage } = await fetchUserByEmail(user);
    const newCredentials = {
      companyName: user.displayName,
      userEmail: user.email,
      userRole,
      stage,
    };
    return newCredentials;
  } else {
    console.log("handleNoCredentials: No user logged");
    await showAdaptiveCardByData(rawSuggestAuthCard, context);
    return null;
  }
}

module.exports = handleNoCredentials;
