const { doc, getDoc } = require("firebase/firestore");
const { db } = require("../../firebase");

async function fetchPerformanceReviewStartDate(credentials) {
  const infoRef = doc(db, credentials.companyName, "companyInfo");
  try {
    const res = await getDoc(infoRef);
    const perfStartDate = res.data().startPerfReviewDate;
    console.log("Performance review dates fetched successfully.");
    return perfStartDate.replace(/-/g, ".");
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

module.exports = fetchPerformanceReviewStartDate;
