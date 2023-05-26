const fetchGoalsByEmail = require("./fetchGoalsByEmail");

async function fetchGoal1NameByEmail(credentials) {
  let goal = await fetchGoalsByEmail(credentials);
  try {
    return goal[0].name;
  }
  catch{
    return ""
  }
}

module.exports = fetchGoal1NameByEmail;
