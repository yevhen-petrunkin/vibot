const updateUserByEmail = require("./updateUserByEmail");

async function updateUserCareerStageByEmail(userEmail, stage, companyName) {
  const careerData = { stage };
  try {
    await updateUserByEmail(userEmail, careerData, companyName);
    console.log("User Career Stage updated");
    return true;
  } catch (error) {
    console.log(error.message);
    console.log("Failed to update Career Stage in firestore.");
    return false;
  }
}

module.exports = updateUserCareerStageByEmail;

// --- stage must be string (it's a keyword from adaptiveCard) !!!!!!!!!!!!!!
// for example:  "hello";
