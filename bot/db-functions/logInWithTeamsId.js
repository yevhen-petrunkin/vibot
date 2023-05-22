const { signInWithEmailAndPassword } = require("firebase/auth");
const { auth } = require("../firebase");

async function logInWithTeamsId(teamsId, userEmail) {
  console.log("logInUser:", userEmail);

  try {
    const { user } = await signInWithEmailAndPassword(auth, userEmail, teamsId);
    console.log("User has been logged in successfully.");
    return user;
  } catch (error) {
    console.log(error.message);
    console.log("Failed to log in user.");
    return null;
  }
}

module.exports = logInWithTeamsId;
