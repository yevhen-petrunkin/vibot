const fetchGoalsByEmail = require("./fetchGoalsByEmail");

async function fetchGoal3DescriptionByEmail(credentials) {
  let goal = await fetchGoalsByEmail(credentials);
  try {
    return goal[2].description;
  }
  catch{
    return ""
  }
}

module.exports = fetchGoal3DescriptionByEmail;
