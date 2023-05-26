const fetchUsersByManagerEmail = require("./fetchUsersByManagerEmail");

async function fetchUsersEmailWithoutPlan(credentials) {
  const users = await fetchUsersByManagerEmail(credentials);
  if (!users.length) {
    return [];
  }
  const usersWithoutPlan = users.filter(
    ({ hasCareerPlan, userRole }) =>
      !hasCareerPlan &&
      userRole.toLowerCase() !== "manager" &&
      userRole.toLowerCase() !== "admin"
  );
  if (!usersWithoutPlan.length) {
    console.log("There are no users without a plan.");
    return [];
  }
  console.log("Users without a plan found.");
  const userEmailes = usersWithoutPlan.map(({ userEmail }) => userEmail);
  return userEmailes;
}

module.exports = fetchUsersEmailWithoutPlan;
