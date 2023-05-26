const fetchGoalsByEmail = require("./fetchGoalsByEmail");

async function fetchGoal4NameByEmail(credentials) {
  let goal = await fetchGoalsByEmail(credentials);
  try {
    return goal[3].name;
  }
  catch{
    return ""
  }
}

module.exports = fetchGoal4NameByEmail;
