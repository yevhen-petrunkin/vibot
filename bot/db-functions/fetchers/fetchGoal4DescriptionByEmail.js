const fetchGoalsByEmail = require("./fetchGoalsByEmail");

async function fetchGoal4DescriptionByEmail(credentials) {
  let goal = await fetchGoalsByEmail(credentials);
  try {
    return goal[3].description;
  }
  catch{
    return ""
  }
}

module.exports = fetchGoal4DescriptionByEmail;
