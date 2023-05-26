const getNearestQuarterDate = require("../getNearestQuarterDate");

async function createPlanReviewReminder(context, credentials) {
  try {
    const { userEmail } = await credentials;
    const userName = await context.activity.from.name;

    const nearestQuarterDate = getNearestQuarterDate();

    return {
      userEmail,
      userName,
      verb: "activeManagerRemainderSpecPlan",
      triggerDate: nearestQuarterDate,
      data: null,
      complete: false,
    };
  } catch (error) {
    console.log(error.message);
    console.log("createPlanReviewReminder: Failed to create reminder.");
    return null;
  }
}

module.exports = createPlanReviewReminder;
