const { doc, getDoc } = require("firebase/firestore");
const { db } = require("../firebase");

async function fetchUserByEmail(userEmail, companyName) {
  try {
    const userRef = doc(db, companyName, "companyUsers", "users", userEmail);

    console.log("Company name and userEmail: ", userEmail, companyName);

    const res = await getDoc(userRef);
    console.log("User fetched successfully.");
    if (res) {
      console.log("fetchUserByEmail, res.data(): ", res.data());
      return res.data();
    }

    return null;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    console.log("Failed to fetch user.");
    return null;
  }
}

module.exports = fetchUserByEmail;
