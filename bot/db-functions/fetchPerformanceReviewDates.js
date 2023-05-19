const { doc, getDoc } = require("firebase/firestore");
const { db } = require("../firebase");

async function fetchPerformanceReviewDates(companyName) {
  const infoRef = doc(db, companyName, "companyInfo");
  try {
    const res = await getDoc(infoRef);
    const { startPerfReviewDate, endPerfReviewDate } = res.data();
    console.log("Performance review dates fetched successfully.");
    return { startPerfReviewDate, endPerfReviewDate };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    console.log("Failed to fetch performance review dates");
    return {
      startPerfReviewDate: "",
      endPerfReviewDate: "",
    };
  }
}

module.exports = fetchPerformanceReviewDates;
