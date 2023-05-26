const fetchGoalsByEmail = require("./fetchGoalsByEmail");

async function fetchGoal1DeadlineByEmail(credentials) {
  let goal = await fetchGoalsByEmail(credentials);
  try {
    return goal[0].deadline;
  }
  catch{
    return ""
  }
}

module.exports = fetchGoal1DeadlineByEmail;
