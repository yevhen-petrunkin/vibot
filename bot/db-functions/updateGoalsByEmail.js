const { doc, setDoc, updateDoc, arrayUnion } = require("firebase/firestore");
const { db } = require("../firebase");
const handleUserReplyMessages = require("../handlers/handleUserReplyMessages");

async function updateGoalsByEmail(updateEmail, goal, { context, credentials }) {
  const userRef = doc(
    db,
    credentials.companyName,
    "companyUsers",
    "users",
    updateEmail
  );

  try {
    await updateDoc(userRef, {
      goals: arrayUnion(goal),
    });
    console.log("updateGoalsByEmail: Goal has been sent to firestore.", goal);
    const newVerb = "goalSentMessage";
    await handleUserReplyMessages(newVerb, context, credentials);

    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}

module.exports = updateGoalsByEmail;
