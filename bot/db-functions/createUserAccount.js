const { createUserWithEmailAndPassword } = require("firebase/auth");
const { auth } = require("../firebase");
const createKeyword = require("../helpers/createKeyword");
const createAuthEmail = require("../helpers/emailCreators/createAuthEmail");
const sendEmail = require("../actions/sendEmail");
const handleAdminReplyMessages = require("../handlers/handleAdminReplyMessages");

async function createUserAccount(context, credentials) {
  try {
    const { userEmail, userRole } = context.activity.value.action.data;
    const userKeyword = await createKeyword(16);
    let linkToManual = "";

    if (userRole.toLowerCase() === "specialist".toLowerCase()) {
      linkToManual = "./files/specialist.pdf";
    }

    if (userRole.toLowerCase() === "manager".toLowerCase()) {
      linkToManual = "./files/manager.pdf";
    }

    const authConfig = {
      recipientEmail: userEmail,
      authEmail: userEmail,
      authKeyword: userKeyword,
      link: linkToManual,
    };

    const wasEmailSent = await sendEmail(createAuthEmail, authConfig);

    if (wasEmailSent) {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userKeyword
      );

      console.log(
        `User Account has been registered successfully. UserEmail ${userEmail}`
      );
      return user;
    }
    return null;
  } catch (error) {
    console.log(error.message);
    const newVerb = "sameAccountAlert";
    await handleAdminReplyMessages(newVerb, context, credentials);
    return null;
  }
}

module.exports = createUserAccount;
