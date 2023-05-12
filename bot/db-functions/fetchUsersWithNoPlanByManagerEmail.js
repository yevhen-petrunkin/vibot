const fetchAllUsers = require("./fetchAllUsers");

async function fetchUsersWithNoPlanByManagerEmail(email, companyName) {
  const users = await fetchAllUsers(companyName);
  if (!users.length) {
    return [];
  }
  const areSuchUsers = await users.some(
    ({ managerEmail, hasCareerPlan }) =>
      email === managerEmail && !hasCareerPlan
  );
  if (!areSuchUsers) {
    console.log(
      "There are no users found with this manager that have no career plan."
    );
    return [];
  }
  console.log(
    "Some users that have no career plan have been found with this manager."
  );
  return await users.filter(
    ({ managerEmail, hasCareerPlan }) =>
      email === managerEmail && !hasCareerPlan
  );
}

module.exports = fetchUsersWithNoPlanByManagerEmail;
