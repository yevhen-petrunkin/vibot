const { doc, setDoc, serverTimestamp } = require("firebase/firestore");
const { db } = require("../firebase");

async function createUserAsStaff(contextData, user, companyName) {
  const formData = contextData.value.action.data;
  const { userEmail, startingDate, userRole, managerEmail } = formData;

  const userData = {
    userId: user.uid,
    teamsId: "",
    userName: "",
    userEmail,
    userRole,
    managerEmail,
    startingDate,
    stage: "hello",
    hasCareerPlan: false,
    timeStamp: serverTimestamp(),
  };

  const userRef = doc(db, companyName, "companyUsers", "users", userEmail);

  try {
    await setDoc(userRef, userData);
    console.log("User registered as company staff.");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    console.log("Failed to register User as Company staff.");
  }
}

module.exports = createUserAsStaff;
