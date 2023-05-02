const { doc, updateDoc, serverTimestamp } = require("firebase/firestore");
const { db } = require("../firebase.js");

async function postSecondaryUserData(data) {
  const userId = data.from.id;
  const userData = data.value.action.data;

  try {
    await updateDoc(doc(db, "users", userId), {
      ...userData,
      timeStamp: serverTimestamp(),
    });
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = postSecondaryUserData;
