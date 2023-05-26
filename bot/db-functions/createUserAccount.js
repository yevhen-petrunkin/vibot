const { createUserWithEmailAndPassword } = require("firebase/auth");
const { auth } = require("../firebase");
const createKeyword = require("../helpers/createKeyword");
const createAuthEmail = require("../helpers/emailCreators/createAuthEmail");
const sendEmail = require("../actions/sendEmail");
const handleAdminReplyMessages = require("../handlers/handleAdminReplyMessages");

async function createUserAccount(context, credentials) {
  try {
    const { userEmail, userRole } = context.activity.value.action.data;
    const userKeyword = createKeyword(16);
    let linkToManual = "";

    if (userRole.toLowerCase() === "specialist".toLowerCase()) {
      linkToManual = "./files/specialist.pdf";
    }

    if (userRole.toLowerCase() === "manager".toLowerCase()) {
      linkToManual = "./files/manager.pdf";
    }

    const { user } = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      userKeyword
    );

    const authConfig = {
      recipientEmail: userEmail,
      authEmail: userEmail,
      authKeyword: userKeyword,
      link: linkToManual,
    };

    await sendEmail(createAuthEmail, authConfig);

    console.log(
      `User Account has been registered successfully. UserEmail ${userEmail} User keyword ${userKeyword}`
    );
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    const newVerb = "sameAccountAlert";
    await handleAdminReplyMessages(newVerb, context, credentials);
  }
}

module.exports = createUserAccount;
