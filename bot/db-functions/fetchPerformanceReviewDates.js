const { doc, getDoc } = require("firebase/firestore");
const { db } = require("../firebase");

async function fetchPerformanceReviewDates(companyName) {
  const infoRef = doc(db, companyName, "companyInfo");
  try {
    const res = await getDoc(infoRef);
    const { firstPerfrReviewPeriod, secondPerfrReviewPeriod } = res.data();
    console.log("Performance review dates fetched successfully.");
    return { firstPerfrReviewPeriod, secondPerfrReviewPeriod };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    console.log("Failed to fetch performance review dates");
    return {
      firstPerfReviewPeriod: {
        startPerfReviewDate: "",
        endPerfReviewDate: "",
      },
      secondPerfReviewPeriod: {
        startPerfReviewDate: "",
        endPerfReviewDate: "",
      },
    };
  }
}

module.exports = fetchPerformanceReviewDates;
