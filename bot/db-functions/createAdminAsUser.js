const { doc, setDoc } = require("firebase/firestore");
const { db } = require("../firebase");

async function createAdminAsUser(contextData, user) {
  const teamsId = contextData.from.id;
  const userName = contextData.from.name;
  const { companyName, adminEmail } = contextData.value.action.data;

  const userData = {
    userId: user.uid,
    teamsId,
    userName,
    userEmail: adminEmail,
    userRole: "admin",
    managerEmail: "",
    startingDate: "",
    stage: "admin",
    hasCareerPlan: false,
  };

  const companyUsersRef = doc(
    db,
    companyName,
    "companyUsers",
    "users",
    adminEmail
  );

  try {
    await setDoc(companyUsersRef, userData);
    console.log("Admin Registered As User");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    console.log("Failed to register Admin As User.");
  }
}

module.exports = createAdminAsUser;
