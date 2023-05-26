const fetchGoalsByEmail = require("./fetchGoalsByEmail");

async function fetchGoal1DescriptionByEmail(credentials) {
  let goal = await fetchGoalsByEmail(credentials);
  try {
    return goal[0].description;
  }
  catch{
    return ""
  }
}

module.exports = fetchGoal1DescriptionByEmail;
