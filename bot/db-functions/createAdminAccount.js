const { createUserWithEmailAndPassword } = require("firebase/auth");
const { auth } = require("../firebase");

async function createAdminAccount(contextData) {
  const adminPassword = contextData.from.id;
  const { adminEmail } = contextData.value.action.data;

  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      adminEmail,
      adminPassword
    );
    console.log("Admin Account has been registered successfully.");
    return user;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = createAdminAccount;
