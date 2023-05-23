const { doc, getDoc } = require("firebase/firestore");
const { db } = require("../firebase");

async function fetchPerformanceReviewDates(companyName) {
  const infoRef = doc(db, companyName, "companyInfo");
  try {
    const res = await getDoc(infoRef);
    const { perfStartDate, perfEndDate } = res.data();
    console.log("Performance review dates fetched successfully.");
    return { perfStartDate, perfEndDate };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    console.log("Failed to fetch performance review dates");
    return {
      perfStartDate: "",
      perfEndDate: "",
    };
  }
}

module.exports = fetchPerformanceReviewDates;
