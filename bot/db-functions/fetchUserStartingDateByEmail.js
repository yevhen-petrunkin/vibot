const fetchUserByEmail = require("./fetchUserByEmail");

async function fetchUserStartingDateByEmail(userEmail, companyName) {
  try {
    const userData = await fetchUserByEmail(userEmail, companyName);
    return userData.startingDate;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

module.exports = fetchUserStartingDateByEmail;
