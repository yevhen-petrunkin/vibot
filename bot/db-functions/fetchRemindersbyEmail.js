const fetchUserByEmail = require("./fetchUserByEmail");

async function fetchRemindersbyEmail(userEmail, companyName) {
  try {
    const userData = await fetchUserByEmail(userEmail, companyName);
    console.log(
      "Reminders have been fetched successfully: ",
      userData.reminders
    );
    return userData.reminders;
  } catch (error) {
    console.log(error.message);
    console.log("Failed to fetch reminders. Return empty array");
    return [];
  }
}

module.exports = fetchRemindersbyEmail;
