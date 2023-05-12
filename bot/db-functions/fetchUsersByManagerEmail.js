const fetchAllUsers = require("./fetchAllUsers");

async function fetchUsersByManagerEmail(email, companyName) {
  const users = await fetchAllUsers(companyName);
  if (!users.length) {
    return [];
  }
  const areSuchUsers = await users.some(
    ({ managerEmail }) => email === managerEmail
  );
  if (!areSuchUsers) {
    console.log("There are no users found with this manager.");
    return [];
  }
  console.log("Some users have been found with this manager.");
  return await users.filter(({ managerEmail }) => email === managerEmail);
}

module.exports = fetchUsersByManagerEmail;
