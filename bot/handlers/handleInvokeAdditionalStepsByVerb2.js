const updateUserByEmail = require("../db-functions/updateUserByEmail");
const updateRemindersByEmail = require("../db-functions/updateRemindersByEmail");
const handleCredentials = require("./handleCredentials");
const checkUserStartingDate = require("../helpers/specialistProactiveHelpers/checkSixMothsLaterDate");

async function handleInvokeAdditionalStepsByVerb2(verb, config) {
  const { context, credentials, state } = config;
  const { companyName, userEmail, stage } = credentials;
  const userName = await context.activity.from.name;

  const isUserAuth = await handleCredentials(context.activity, credentials);
  if (isUserAuth) {
    switch (verb.toLowerCase()) {
      case "createGoal1".toLowerCase():
      case "createGoal2".toLowerCase():
      case "createGoal3".toLowerCase():
      case "createGoal4".toLowerCase():
        const goalsData = { goals: [] };
        console.log(credentials.stage);
        const newGoal = {
          id: context.activity.value.action.data.goalId,
          name: context.activity.value.action.data.goalName,
          deadline: context.activity.value.action.data.deadLine,
          description: context.activity.value.action.data.description,
        };
        if (stage === "createGoal1") {
          goalsData.goals[0] = newGoal;
        }
        if (stage === "createGoal2") {
          goalsData.goals[1] = newGoal;
        }
        if (stage === "createGoal3") {
          goalsData.goals[2] = newGoal;
        }
        if (stage === "createGoal4") {
          goalsData.goals[3] = newGoal;
        }
        //goalsData.goals.push(newGoals);
        console.log(goalsData);
        updateUserByEmail(userEmail, goalsData, config);

        break;
    }
  }
}

module.exports = handleInvokeAdditionalStepsByVerb2;
