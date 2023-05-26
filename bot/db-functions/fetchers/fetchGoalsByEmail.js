const fetchUserByEmail = require("./fetchUserByEmail");

async function fetchGoalsByEmail(credentials) {
  try {
    console.log("Start fetching Goals");
    const userData = await fetchUserByEmail(credentials);
    console.log("Goals have been fetched successfully: ", userData.goals);

    if (userData) {
      const userGoals = userData.goals;
      return userGoals.sort((a, b) => a.id.localeCompare(b.id));
    }

    console.log("Failed to fetch goals. Return empty array");
    return [];
  } catch (error) {
    console.log(error.message);
    console.log("Failed to fetch goals. Return empty array");
    return [];
  }
}

module.exports = fetchGoalsByEmail;
