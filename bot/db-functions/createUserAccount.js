const { createUserWithEmailAndPassword } = require("firebase/auth");
const { auth } = require("../firebase");
const createKeyword = require("../helpers/createKeyword");
const createAuthEmail = require("../helpers/emailCreators/createAuthEmail");
const sendEmail = require("../actions/sendEmail");

async function createUserAccount(contextData) {
  const { userEmail } = contextData.value.action.data;
  const userKeyword = await createKeyword(16);

  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      userKeyword
    );

    const authConfig = {
      recipientEmail: userEmail,
      authEmail: userEmail,
      authKeyword: userKeyword,
    };

    await sendEmail(createAuthEmail, authConfig);

    console.log(
      `User Account has been registered successfully. UserEmail ${userEmail} User keyword ${userKeyword}`
    );
    return user;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = createUserAccount;
