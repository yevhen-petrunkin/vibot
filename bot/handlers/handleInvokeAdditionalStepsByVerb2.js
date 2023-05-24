// const updateUserByEmail = require("../db-functions/updateUserByEmail");
const fetchUserByEmail = require("../db-functions/fetchUserByEmail");
const updateGoalsByEmail = require("../db-functions/updateGoalsByEmail");
const deleteGoalByEmail = require("../db-functions/deleteGoalByEmail");
const handleCredentials = require("./handleCredentials");

async function handleInvokeAdditionalStepsByVerb2(verb, config) {
  const { context, credentials, state } = config;
  const { companyName, userEmail, stage } = credentials;
  const userName = await context.activity.from.name;

  const isUserAuth = await handleCredentials(context.activity, credentials);
  if (isUserAuth) {
    switch (verb.toLowerCase()) {
      case "createGoal".toLowerCase():
        //  console.log(credentials.stage);
        const goal = {
          id: context.activity.value.action.data.goalId,
          name: context.activity.value.action.data.goalName,
          deadline: context.activity.value.action.data.deadLine,
          description: context.activity.value.action.data.description,
        };
        const userData = await fetchUserByEmail(userEmail, companyName);
        console.log("user:", userData);
        //console.log("id:", goal.id);
        if (userData) {
          const findGoal = userData.goals.find(
            (goalId) => goalId.id === goal.id
          );
          if (findGoal) {
            await deleteGoalByEmail(userEmail, findGoal, config);
          }
          console.log("goal:", goal);
          await updateGoalsByEmail(userEmail, goal, config);
        }
        // console.log("findGoal:", findGoal);
        break;

      case "goalDone".toLowerCase():
        //  console.log(credentials.stage);
        const goalId = context.activity.value.action.data.goalId;
        const userDataId = await fetchUserByEmail(userEmail, companyName);
        console.log("user:", userDataId);
        //console.log("id:", goal.id);
        if (userDataId) {
          const findGoalById = userDataId.goals.find(
            (goal) => goal.id === goalId
          );
          // console.log("findGoal:", findGoal);
          await deleteGoalByEmail(userEmail, findGoalById, config);
        }
        break;
    }
  }
}

module.exports = handleInvokeAdditionalStepsByVerb2;
