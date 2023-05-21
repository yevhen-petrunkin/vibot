const { doc, getDoc } = require("firebase/firestore");
const { db } = require("../../firebase");

async function fetchUserName(credentials) {
  const userRef = doc(db, credentials.companyName, "companyUsers", "users", credentials.userEmail);
  try {
    const res = await getDoc(userRef);
    console.log("User fetched successfully.");
    console.log(JSON.stringify(res.data(), undefined, 2));
    return res.data().userName;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    console.log("Failed to fetch user.");
    return null;
  }
}

module.exports = fetchUserName;
