const { doc, getDoc } = require("firebase/firestore");
const { db } = require("../../firebase");

async function fetchPerformanceReviewEndDate(credentials) {
  const infoRef = doc(db, credentials.companyName, "companyInfo");
  try {
    const res = await getDoc(infoRef);
    const perfEndDate = res.data().perfEndDate;
    console.log("Performance review dates fetched successfully.");
    return perfEndDate.replace(/-/g, ".");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    console.log("Failed to fetch performance review dates");
    return "";
  }
}

module.exports = fetchPerformanceReviewEndDate;
