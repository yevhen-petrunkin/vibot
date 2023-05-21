const fetchUsersByManagerEmail = require("./fetchUsersByManagerEmail");

async function fetchUsersDateWithoutPlan(credentials) {
  console.log("NoPlan");
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
  const userDates = usersWithoutPlan.map(({ startingDate }) => startingDate);
  return userDates;
}

module.exports = fetchUsersDateWithoutPlan;
