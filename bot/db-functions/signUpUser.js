const { signInWithEmailAndPassword } = require("firebase/auth");
const { auth } = require("../firebase");

async function signUpUser(contextData) {
  const { signUpEmail, signUpKeyword } = contextData.value.action.data;

  try {
    const { user } = await signInWithEmailAndPassword(
      auth,
      signUpEmail,
      signUpKeyword
    );
    console.log("User has been signed up successfully.");
    return user;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

module.exports = signUpUser;
