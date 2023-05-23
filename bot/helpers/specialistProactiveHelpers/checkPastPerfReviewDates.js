const checkIsDatePassed = require("../checkIsDatePassed");
const getTwoDaysLaterDate = require("../getTwoDaysLaterDate");
const updateUserByEmail = require("../../db-functions/updateUserByEmail");

async function checkPastPerfReviewDates(context, credentials) {
  const userName = context.activity.from.name;
  const { userPerfDates, userEmail } = credentials;
  const { notifiedOnStart, notifiedOnEnd, perfEndDate } = userPerfDates;
  const newDatesData = {
    userPerfDates,
  };

  try {
    if (
      (!notifiedOnStart && !notifiedOnEnd) ||
      (notifiedOnStart && notifiedOnEnd)
    ) {
      return null;
    }

    if (notifiedOnStart && !notifiedOnEnd) {
      const twoDaysLaterDate = getTwoDaysLaterDate(perfEndDate);

      if (checkIsDatePassed(twoDaysLaterDate)) {
        newDatesData.userPerfDates.notifiedOnEnd = true;
        await updateUserByEmail(userEmail, newDatesData, {
          context,
          credentials,
        });
        return {
          userEmail,
          userName,
          verb: "activeSpecRemainderStudy",
          triggerDate: twoDaysLaterDate,
          data: { ...newDatesData },
          complete: false,
        };
      }

      return null;
    }

    return null;
  } catch (error) {
    console.log(error.message);
    console.log("checkPastPerfReviewDates: Failed to create reminder.");
    return null;
  }
}

module.exports = checkPastPerfReviewDates;
