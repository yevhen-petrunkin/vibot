const { doc, getDoc, deleteDoc } = require("firebase/firestore");
const { db } = require("../firebase");

async function fetchUserData(userId) {
  const userRef = doc(db, "users", userId);
  const res = await getDoc(userRef);
  return res.data();
}

module.exports = fetchUserData;
