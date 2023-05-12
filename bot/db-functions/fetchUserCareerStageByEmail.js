const fetchUserByEmail = require("./fetchUserByEmail");

async function fetchUserCareerStageByEmail(userEmail, companyName) {
  try {
    const userData = await fetchUserByEmail(userEmail, companyName);
    return userData.stage;
  } catch (error) {
    console.log(error.message);
    return "hello";
  }
}

module.exports = fetchUserCareerStageByEmail;
