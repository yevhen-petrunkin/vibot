const fetchUsersByManagerEmail = require("./fetchUsersByManagerEmail");

async function fetchUsersNameWithoutPlan(credentials) {
  const users = await fetchUsersByManagerEmail(credentials);
  if (!users.length) {
    return [];
  }
  const usersWithoutPlan = users.filter(({ hasCareerPlan }) => !hasCareerPlan);
  if (!usersWithoutPlan.length) {
    console.log("There are no users without a plan.");
    return [];
  }
  console.log("Users without a plan found.");
  const userNames = usersWithoutPlan.map(({ userName }) => userName);
  return userNames;
}

module.exports = fetchUsersNameWithoutPlan;
