const { doc, updateDoc, serverTimestamp } = require("firebase/firestore");
const { db } = require("../firebase.js");

async function updateUserCareerStage(stage, userId) {
  try {
    await updateDoc(doc(db, "users", userId), {
      stage,
      timeStamp: serverTimestamp(),
    });
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = updateUserCareerStage;
