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
    console.log("User Array: ", newArr);
    console.log("All User data obtained.");
    return newArr;
  } catch (error) {
    console.log(error.message);
    console.log("Failed to fetch users array. Return empty array.");
    return [];
  }
}

module.exports = fetchAllUsers;

// try {
//   const users = await getDocs(collection(db, "users"));
//   const usersArr = [];
//   if (users) {
//     users.forEach((user) => {
//       const userData = { id: user.id, data: user.data() };
//       usersArr.push(userData);
//     });
//     if (usersArr.length) {
//       const command = findCommandStageByUserId(userId, usersArr);
//       return command.toLowerCase();
//     }
//   }
//   if (!users || !usersArr.length) {
//     return "hello";
//   }
// } catch (error) {
//   console.log(error.message);
// }
