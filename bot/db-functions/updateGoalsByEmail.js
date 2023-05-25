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
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    //console.log(
    //   "updateGoalByEmail: Failed to send goal to firestore. Trying to create goal and send again..."
    // );
    // try {
    //   await setDoc(userRef, {
    //   goals: [goal],
    //   });
    //   console.log(
    //     "updateGoalsByEmail: Goals have been created and goal sent to firestore.",
    //     goal
    //   );
    //   const newVerb = "goalSentMessage";
    //   await handleUserReplyMessages(newVerb, context, credentials);

    //   return true;
    // } catch (error) {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   console.log(errorCode, errorMessage);
    //   console.log(
    //     "updateGoalsByEmail: Failed to create goals and send goal to firestore."
    //   );
    // }

    return false;
  }
}

module.exports = updateGoalsByEmail;
