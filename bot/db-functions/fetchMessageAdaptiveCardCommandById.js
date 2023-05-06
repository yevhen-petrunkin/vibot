const { collection, getDocs } = require("firebase/firestore");
const { db } = require("../firebase.js");
const findCommandStageByUserId = require("../helpers/findCommandStageByUserId.js");

async function fetchMessageAdaptiveCardCommandById(userId) {
  try {
    const users = await getDocs(collection(db, "users"));
    const usersArr = [];
    if (users) {
      users.forEach((user) => {
        const userData = { id: user.id, data: user.data() };
        usersArr.push(userData);
      });
      if (usersArr.length) {
        const command = findCommandStageByUserId(userId, usersArr);
        return command.toLowerCase();
      }
    }
    if (!users || !usersArr.length) {
      return "hello";
    }
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = fetchMessageAdaptiveCardCommandById;
