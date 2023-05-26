const updateUserByEmail = require("./updateUserByEmail");

async function updateUserCareerStageByEmail(userEmail, stage, config) {
  const careerData = { stage };
  try {
    await updateUserByEmail(userEmail, careerData, config);
    console.log("User Career Stage updated");
    return true;
  } catch (error) {
    console.log(error.message);
    console.log("Failed to update Career Stage in firestore.");
    return false;
  }
}

module.exports = updateUserCareerStageByEmail;
