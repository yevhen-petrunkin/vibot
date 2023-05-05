const { doc, updateDoc, serverTimestamp } = require("firebase/firestore");
const { db } = require("../firebase.js");

async function postCustomUserData(customData, userId) {
  try {
    await updateDoc(doc(db, "users", userId), {
      ...customData,
      timeStamp: serverTimestamp(),
    });
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = postCustomUserData;
