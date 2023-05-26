const { doc, setDoc, updateDoc, arrayUnion } = require("firebase/firestore");
const { db } = require("../firebase");
const handleAdminReplyMessages = require("../handlers/handleAdminReplyMessages");

async function updateRemindersByEmail(
  updateEmail,
  reminder,
  { context, credentials }
) {
  const userRef = doc(
    db,
    credentials.companyName,
    "companyUsers",
    "users",
    updateEmail
  );

  try {
    await updateDoc(userRef, {
      reminders: arrayUnion(reminder),
    });
    console.log("Reminder has been sent to firestore.", reminder);
    const newVerb = "reminderSentMessage";
    await handleAdminReplyMessages(newVerb, context, credentials);

    return true;
  } catch (error) {
    console.log(error.message);
    console.log(
      "Failed to send reminder to firestore. Trying to create reminders and send again..."
    );
    return false;
  }
}

module.exports = updateRemindersByEmail;
