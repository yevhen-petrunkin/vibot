const fetchUserByEmail = require("./fetchUserByEmail");

async function fetchGoalsbyEmail(userEmail, companyName) {
  try {
    const userData = await fetchUserByEmail(userEmail, companyName);
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

module.exports = fetchGoalsbyEmail;
