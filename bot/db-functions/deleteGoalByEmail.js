const { doc, updateDoc, arrayRemove } = require("firebase/firestore");
const { db } = require("../firebase");
const handleUserReplyMessages = require("../handlers/handleUserReplyMessages");

async function deleteGoalByEmail(updateEmail, goal, { context, credentials }) {
  const userRef = doc(
    db,
    credentials.companyName,
    "companyUsers",
    "users",
    updateEmail
  );

  try {
    await updateDoc(userRef, {
      goals: arrayRemove(goal),
    });
    console.log("deleteGoalsByEmail: Goal has been delete to firestore.", goal);
    const newVerb = "goalDeleteMessage";
    await handleUserReplyMessages(newVerb, context, credentials);

    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}

module.exports = deleteGoalByEmail;
