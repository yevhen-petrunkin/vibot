const fetchGoalsByEmail = require("./fetchGoalsByEmail");

async function fetchGoal2NameByEmail(credentials) {
  let goal = await fetchGoalsByEmail(credentials);
  try {
    return goal[1].name;
  }
  catch{
    return ""
  }
}

module.exports = fetchGoal2NameByEmail;
