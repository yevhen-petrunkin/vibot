const fetchGoalsByEmail = require("./fetchGoalsByEmail");

async function fetchGoal3NameByEmail(credentials) {
  let goal = await fetchGoalsByEmail(credentials);
  try {
    return goal[2].name;
  }
  catch{
    return ""
  }
}

module.exports = fetchGoal3NameByEmail;
