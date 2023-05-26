const getNearestQuarterDate = require("../getNearestQuarterDate");

async function createPlanJoyReminder(context, credentials) {
  try {
    const { userEmail } = await credentials;
    const userName = await context.activity.from.name;

    const nearestQuarterDate = getNearestQuarterDate();

    return {
      userEmail,
      userName,
      verb: "activeSpecPlanJoy",
      triggerDate: nearestQuarterDate,
      data: { hasCareerPlan: true },
      complete: false,
    };
  } catch (error) {
    console.log(error.message);
    console.log("createPlanJoyReminder: Failed to create reminder.");
    return null;
  }
}

module.exports = createPlanJoyReminder;
