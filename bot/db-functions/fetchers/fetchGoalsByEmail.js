const fetchUserByEmail = require("./fetchUserByEmail");

async function fetchGoalsByEmail(credentials) {
  try {
    console.log("Start fetching Goals");
    const userData = await fetchUserByEmail(credentials);
    console.log("Goals have been fetched successfully: ", userData.goals);
    console.log(JSON.stringify(userData, undefined, 2));
    console.log(JSON.stringify(userData.goals, undefined, 2));

    return userData.goals;
  } catch (error) {
    console.log(error.message);
    console.log("Failed to fetch goals. Return empty array");
    return [];
  }
}

module.exports = fetchGoalsByEmail;
