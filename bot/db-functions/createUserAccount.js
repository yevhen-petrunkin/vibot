const { createUserWithEmailAndPassword } = require("firebase/auth");
const { auth } = require("../firebase");

async function createUserAccount(contextData) {
  const { userEmail, userKeyword } = contextData.value.action.data;

  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      userKeyword
    );
    console.log("User Account has been registered successfully.");
    return user;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = createUserAccount;
