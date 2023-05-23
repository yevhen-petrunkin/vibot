const checkIsDatePassed = require("../checkIsDatePassed");
const getWeekEarlierDate = require("../getWeekEarlierDate");
const fetchPerformanceReviewDates = require("../../db-functions/fetchPerformanceReviewDates");

async function checkNearestPerfReviewDates(context, credentials) {
  const userName = context.activity.from.name;
  try {
    const dates = await fetchPerformanceReviewDates(credentials.companyName);

    if (dates && dates.perfStartDate) {
      if (checkIsDatePassed(dates.perfStartDate)) {
        return null;
      }
      const weekEarlierDate = getWeekEarlierDate(dates.perfStartDate);
      if (checkIsDatePassed(weekEarlierDate)) {
        return {
          userEmail: credentials.userEmail,
          userName,
          verb: "activeSpecRemainderPR",
          triggerDate: weekEarlierDate,
          data: dates,
          complete: false,
        };
      }
      return null;
    }
  } catch (error) {
    console.log(error.message);
    console.log("checkNearestPerfReviewDates: Failed to create reminder.");
    return null;
  }
}

module.exports = checkNearestPerfReviewDates;
