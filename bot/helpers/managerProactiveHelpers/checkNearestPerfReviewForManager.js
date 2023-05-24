const checkIsDatePassed = require("../checkIsDatePassed");
const getWeekEarlierDate = require("../getWeekEarlierDate");
const fetchPerformanceReviewDates = require("../../db-functions/fetchPerformanceReviewDates");
const updateUserByEmail = require("../../db-functions/updateUserByEmail");

async function checkNearestPerfReviewForManager(context, credentials) {
  try {
    const userName = context.activity.from.name;
    const { companyName, userPerfDates, userEmail } = credentials;
    const { perfStartDate } = userPerfDates;
    const newDatesData = {
      userPerfDates,
    };

    const dates = await fetchPerformanceReviewDates(companyName);

    if (dates) {
      if (dates.perfStartDate !== perfStartDate) {
        newDatesData.userPerfDates.perfStartDate = await dates.perfStartDate;
        newDatesData.userPerfDates.perfEndDate = await dates.perfEndDate;

        await updateUserByEmail(userEmail, newDatesData, {
          context,
          credentials,
        });
      }

      if (checkIsDatePassed(dates.perfStartDate)) {
        return null;
      }

      const weekEarlierDate = getWeekEarlierDate(dates.perfStartDate);

      if (checkIsDatePassed(weekEarlierDate)) {
        return {
          userEmail,
          userName,
          verb: "activeManagerRemainderMeetings",
          triggerDate: weekEarlierDate,
          data: dates,
          complete: false,
        };
      }

      return null;
    }
  } catch (error) {
    console.log(error.message);
    console.log("checkNearestPerfReviewForManager: Failed to create reminder.");
    return null;
  }
}

module.exports = checkNearestPerfReviewForManager;
