const checkIsDatePassed = require("../checkIsDatePassed");
const getNearestDateByGoals = require("../getNearestDateByGoals");
const fetchGoalsbyEmail = require("../../db-functions/fetchGoalsbyEmail");

async function checkSpecGoalDeadlines(context, credentials) {
  try {
    const userName = context.activity.from.name;
    const { userEmail, companyName } = credentials;

    const goals = await fetchGoalsbyEmail(userEmail, companyName);
    if (goals.length) {
      const urgentGoals = goals.filter(({ deadline }) =>
        checkIsDatePassed(deadline)
      );
      if (urgentGoals.length) {
        const nearestDate = getNearestDateByGoals(urgentGoals);

        return {
          userEmail,
          userName,
          verb: "activeSpecRemainderGoalDL",
          triggerDate: nearestDate,
          data: urgentGoals,
          complete: true,
        };
      }
    }
    return null;
  } catch (error) {
    console.log(error.message);
    console.log("checkSpecGoalDeadlines: Failed to create reminder.");
    return null;
  }
}

module.exports = checkSpecGoalDeadlines;
