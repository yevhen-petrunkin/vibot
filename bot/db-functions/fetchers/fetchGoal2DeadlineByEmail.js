const fetchGoalsByEmail = require("./fetchGoalsByEmail");

async function fetchGoal2DeadlineByEmail(credentials) {
  let goal = await fetchGoalsByEmail(credentials);
  try {
    return goal[1].deadline;
  }
  catch{
    return ""
  }
}

module.exports = fetchGoal2DeadlineByEmail;
