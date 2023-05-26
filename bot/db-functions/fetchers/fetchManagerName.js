const { doc, getDoc } = require("firebase/firestore");
const { db } = require("../../firebase");
const fetchAllUsers = require("./fetchAllUsers");
const fetchUserEmailByEmail = require("./fetchUserEmailByEmail")

async function fetchManagerName(credentials) {
  let specManagerEmail = await fetchUserEmailByEmail(credentials);
  let managerRef = doc(db, credentials.companyName, "companyUsers", "users", specManagerEmail);
  try {
    const res = await getDoc(managerRef);
    console.log("User fetched successfully.");
    console.log(JSON.stringify(res.data(), undefined, 2));
    let managerName = res.data().userName;
    return managerName;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    console.log("Failed to fetch user.");
    return null;
  }
}

module.exports = fetchManagerName;
