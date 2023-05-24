const fetchUserByEmail = require("./fetchUserByEmail");

async function fetchGoalsbyEmail(userEmail, companyName) {
  try {
    const userData = await fetchUserByEmail(userEmail, companyName);
    console.log("Goals have been fetched successfully: ", userData.goals);

    return userData.goals;
  } catch (error) {
    console.log(error.message);
    console.log("Failed to fetch goals. Return empty array");
    return [];
  }
}

module.exports = fetchGoalsbyEmail;
