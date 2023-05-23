const { doc, updateDoc } = require("firebase/firestore");
const { db } = require("../firebase");

async function updatePerformanceReviewDates(dateData, companyName) {
  const dateRef = doc(db, companyName, "companyInfo");
  try {
    await updateDoc(dateRef, {
      ...dateData,
    });
    console.log("Dates added to company info.");
    return true;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    console.log("Failed to add dates to company info.");
    return false;
  }
}

module.exports = updatePerformanceReviewDates;

// ---------- dateData must be an object that looks like this: !!!!!!!!!!!!!!
// {
//         perfStartDate: "",
//         perfEndDate: "",
// };
