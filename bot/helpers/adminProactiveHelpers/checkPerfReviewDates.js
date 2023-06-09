const checkIsDatePassed = require("../checkIsDatePassed");
const fetchPerformanceReviewDates = require("../../db-functions/fetchPerformanceReviewDates");

async function checkPerfReviewDates(context, credentials) {
  try {
    const userName = context.activity.from.name;

    const dates = await fetchPerformanceReviewDates(credentials.companyName);
    if (dates.perfEndDate) {
      if (checkIsDatePassed(dates.perfEndDate)) {
        return {
          userEmail: credentials.userEmail,
          userName,
          verb: "activeAdminRemainderUpdatePR",
          triggerDate: dates.perfEndDate,
          data: dates,
          complete: false,
        };
      }
    }
    return null;
  } catch (error) {
    console.log(error.message);
    console.log("checkPerfReviewDates: Failed to create reminder.");
    return null;
  }
}

module.exports = checkPerfReviewDates;
