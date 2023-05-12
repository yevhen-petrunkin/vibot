const { signInWithEmailAndPassword } = require("firebase/auth");
const { auth } = require("../firebase");

async function logInUser(contextData, userEmail) {
  const userPassword = contextData.from.id;
  console.log("logInUser:", contextData.value.action.data);
  console.log("userEmail:", userEmail);

  try {
    const { user } = await signInWithEmailAndPassword(
      auth,
      userEmail,
      userPassword
    );
    console.log("User has been logged in successfully.");
    return user;
  } catch (error) {
    console.log(error.message);
    console.log("Failed to log in user.");
    return null;
  }
}

module.exports = logInUser;
