const fetchUserByEmail = require("./fetchUserByEmail");

async function fetchUserHasPlanByEmail(userEmail, companyName) {
  try {
    const userData = await fetchUserByEmail(userEmail, companyName);
    return userData.hasCareerPlan;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}

module.exports = fetchUserHasPlanByEmail;
