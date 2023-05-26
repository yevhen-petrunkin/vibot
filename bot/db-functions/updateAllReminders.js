const { doc, updateDoc, deleteField } = require("firebase/firestore");
const { db } = require("../firebase");

async function updateAllReminders(updateEmail, reminders, companyName) {
  try {
    const userRef = doc(db, companyName, "companyUsers", "users", updateEmail);

    await updateDoc(userRef, {
      reminders: deleteField(),
    });

    await updateDoc(userRef, {
      reminders,
    });

    console.log("Reminders updated in firestore.", reminders);

    return true;
  } catch (error) {
    console.log(error.message);
    console.log("Failed to update Reminders in firestore.");
    return false;
  }
}

module.exports = updateAllReminders;
