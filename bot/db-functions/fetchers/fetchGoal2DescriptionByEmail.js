const fetchGoalsByEmail = require("./fetchGoalsByEmail");

async function fetchGoal2DescriptionByEmail(credentials) {
  let goal = await fetchGoalsByEmail(credentials);
  try {
    return goal[1].description;
  }
  catch{
    return ""
  }
}

module.exports = fetchGoal2DescriptionByEmail;
