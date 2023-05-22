const getSixMothsLaterDate = require("../getSixMothsLaterDate");
const fetchUserStartingDateByEmail = require("../../db-functions/fetchUserStartingDateByEmail");

async function checkSixMothsLaterDate(context, credentials) {
  try {
    const { userEmail, companyName } = await credentials;
    const userName = await context.activity.from.name;
    const date = await fetchUserStartingDateByEmail(userEmail, companyName);
    if (date) {
      const sixMonthsLaterDate = getSixMothsLaterDate(date);
      return {
        userEmail,
        userName,
        verb: "activeSpecAscPlan",
        triggerDate: sixMonthsLaterDate,
        data: { startingDate: date },
      };
    }
    return null;
  } catch (error) {
    console.log(error.message);
    console.log("checkSixMothsLaterDate: Failed to create reminder.");
    return null;
  }
}

module.exports = checkSixMothsLaterDate;
