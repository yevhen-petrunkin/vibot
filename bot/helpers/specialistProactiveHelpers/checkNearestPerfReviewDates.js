const checkIsDatePassed = require("../checkIsDatePassed");
const getWeekEarlierDate = require("../getWeekEarlierDate");
const fetchPerformanceReviewDates = require("../../db-functions/fetchPerformanceReviewDates");
const updateUserByEmail = require("../../db-functions/updateUserByEmail");

async function checkNearestPerfReviewDates(context, credentials) {
  const userName = context.activity.from.name;
  const { companyName, userPerfDates, userEmail } = credentials;
  const { notifiedOnStart, notifiedOnEnd, perfStartDate } = userPerfDates;
  const newDatesData = {
    userPerfDates,
  };

  try {
    if (notifiedOnStart && !notifiedOnEnd) {
      return null;
    }

    const dates = await fetchPerformanceReviewDates(companyName);

    if (dates) {
      if (dates.perfStartDate !== perfStartDate) {
        newDatesData.userPerfDates.perfStartDate = await dates.perfStartDate;
        newDatesData.userPerfDates.perfEndDate = await dates.perfEndDate;
      }

      if (!notifiedOnStart && !notifiedOnEnd) {
        newDatesData.userPerfDates.notifiedOnStart = true;

        if (checkIsDatePassed(dates.perfStartDate)) {
          await updateUserByEmail(userEmail, newDatesData, {
            context,
            credentials,
          });
          return null;
        }

        const weekEarlierDate = getWeekEarlierDate(dates.perfStartDate);

        if (checkIsDatePassed(weekEarlierDate)) {
          await updateUserByEmail(userEmail, newDatesData, {
            context,
            credentials,
          });
          return {
            userEmail,
            userName,
            verb: "activeSpecRemainderPR",
            triggerDate: weekEarlierDate,
            data: dates,
            complete: false,
          };
        }

        newDatesData.userPerfDates.notifiedOnStart = false;
        await updateUserByEmail(userEmail, newDatesData, {
          context,
          credentials,
        });

        return null;
      }

      if (notifiedOnStart && notifiedOnEnd) {
        if (dates.perfStartDate !== perfStartDate) {
          newDatesData.userPerfDates.notifiedOnStart = false;
          newDatesData.userPerfDates.notifiedOnEnd = false;
          const temporaryCredentials = { ...credentials, ...newDatesData };
          return await checkNearestPerfReviewDates(
            context,
            temporaryCredentials
          );
        }
        return null;
      }
    }

    return null;
  } catch (error) {
    console.log(error.message);
    console.log("checkNearestPerfReviewDates: Failed to create reminder.");
    return null;
  }
}

module.exports = checkNearestPerfReviewDates;
