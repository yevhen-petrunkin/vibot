const getNearestFirstDayOfMonth = require("../getNearestFirstDayOfMonth");

async function createSpecGoalReminder(context, credentials) {
  try {
    const { userEmail } = await credentials;
    const userName = await context.activity.from.name;

    const nearestFirstDayOfMonth = getNearestFirstDayOfMonth();

    console.log(
      "createSpecGoalReminder: Nearest First Day Of Month: ",
      nearestFirstDayOfMonth
    );

    return {
      userEmail,
      userName,
      verb: "activeSpecRemainderGoal",
      triggerDate: nearestFirstDayOfMonth,
      data: [],
      complete: false,
    };
  } catch (error) {
    console.log(error.message);
    console.log("createSpecGoalReminder: Failed to create reminder.");
    return null;
  }
}

module.exports = createSpecGoalReminder;
