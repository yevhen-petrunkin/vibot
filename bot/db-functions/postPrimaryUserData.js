const { doc, setDoc, serverTimestamp } = require("firebase/firestore");
const { db } = require("../firebase.js");
const createPrimaryUserData = require("../helpers/createPrimaryUserData");

async function postPrimaryUserData(data) {
  const userData = createPrimaryUserData(data);
  const userId = data.from.id;

  try {
    await setDoc(doc(db, "users", userId), {
      ...userData,
      timeStamp: serverTimestamp(),
    });
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = postPrimaryUserData;
