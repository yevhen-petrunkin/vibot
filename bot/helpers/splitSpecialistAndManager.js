const fetchUserByEmail = require("../db-functions/fetchUserByEmail");
const splitPlanPathByDate = require("./splitPlanPathByDate");

async function splitSpecialistAndManager(credentials) {
  const { userEmail, companyName, userRole } = credentials;

  if (userRole === "manager") {
    return "managerFileSending";
  }

  const userData = await fetchUserByEmail(userEmail, companyName);

  if (!userData) {
    console.log("Failed to get userData from firestore.");
    return "hello";
  }

  return splitPlanPathByDate(userData.startingDate);
}

module.exports = splitSpecialistAndManager;
