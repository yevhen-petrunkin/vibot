const fetchGoalsByEmail = require("./fetchGoalsByEmail");

async function fetchGoal4DeadlineByEmail(credentials) {
  let goal = await fetchGoalsByEmail(credentials);
  try {
    return goal[3].deadline;
  }
  catch{
    return ""
  }
}

module.exports = fetchGoal4DeadlineByEmail;
