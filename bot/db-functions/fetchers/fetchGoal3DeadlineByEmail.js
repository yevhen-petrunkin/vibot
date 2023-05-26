const fetchGoalsByEmail = require("./fetchGoalsByEmail");

async function fetchGoal3DeadlineByEmail(credentials) {
  let goal = await fetchGoalsByEmail(credentials);
  try {
    return goal[2].deadline;
  }
  catch{
    return ""
  }
}

module.exports = fetchGoal3DeadlineByEmail;
