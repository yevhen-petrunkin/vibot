const { collection, getDocs } = require("firebase/firestore");
const { db } = require("../firebase");

async function fetchAllUsers(companyName) {
  const usersRef = collection(db, companyName, "companyUsers", "users");

  try {
    const users = await getDocs(usersRef);

    if (!users) {
      console.log("There are no users in the company yet. Return empty array.");
      return [];
    }
    const newArr = [];
    users.forEach((user) => {
      newArr.push(user.data());
    });
    console.log("All User data obtained.");
    return newArr;
  } catch (error) {
    console.log(error.message);
    console.log("Failed to fetch users array. Return empty array.");
    return [];
  }
}

module.exports = fetchAllUsers;
