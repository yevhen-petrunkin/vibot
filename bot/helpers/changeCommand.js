const { doc, getDoc, deleteDoc } = require("firebase/firestore");
const { db } = require("../firebase.js");
const postPrimaryUserData = require("../db-functions/postPrimaryUserData");
const fetchUserData = require("../db-functions/fetchUserData");
const splitSpecialistAndManager = require("./splitSpecialistAndManager");
const splitPlanPathByDate = require("./splitPlanPathByDate");

async function changeCommand(verb, data) {
  const userId = data.from.id;

  if (verb.toLowerCase() === "goToCard".toLowerCase()) {
    return data.value.action.data.neededCard;
  }

  if (verb.toLowerCase() === "deleteUser".toLowerCase()) {
    await deleteDoc(doc(db, "users", userId));
    await postPrimaryUserData(data);
    return "hello";
  }

  if (
    verb.toLowerCase() === "userDataSpecialist".toLowerCase() ||
    verb.toLowerCase() === "userDataManager".toLowerCase()
  ) {
    return splitSpecialistAndManager(verb);
  }

  if (verb.toLowerCase() === "determineSpecPath".toLowerCase()) {
    const { userStartDate } = await fetchUserData(userId);
    return splitPlanPathByDate(userStartDate);
  }
  return verb;
}

module.exports = changeCommand;
