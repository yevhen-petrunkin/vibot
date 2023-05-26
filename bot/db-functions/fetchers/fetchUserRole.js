const { doc, getDoc } = require("firebase/firestore");
const { db } = require("../../firebase");

async function fetchUserRole(credentials) {
  const userRef = doc(db, credentials.companyName, "companyUsers", "users", credentials.userEmail);
  try {
    const res = await getDoc(userRef);
    console.log("Role");
    console.log(res.data().userRole);
    return res.data().userRole;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    console.log("Failed to fetch user.");
    return null;
  }
}

module.exports = fetchUserRole;
