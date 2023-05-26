const getCurrentDateFormatted = require("../getCurrentDateFormatted");

async function createSpecGoalDeadlineReminder(context, credentials) {
  try {
    const { userEmail } = await credentials;
    const userName = await context.activity.from.name;

    const currentDate = getCurrentDateFormatted();

    return {
      userEmail,
      userName,
      verb: "activeManagerGoalSpec",
      triggerDate: currentDate,
      data: {},
      complete: true,
    };
  } catch (error) {
    console.log(error.message);
    console.log("createSpecGoalDeadlineReminder: Failed to create reminder.");
    return null;
  }
}

module.exports = createSpecGoalDeadlineReminder;
