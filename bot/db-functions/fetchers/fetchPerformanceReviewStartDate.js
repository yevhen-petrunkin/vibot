const { doc, getDoc } = require("firebase/firestore");
const { db } = require("../../firebase");

async function fetchPerformanceReviewStartDate(credentials) {
  const infoRef = doc(db, credentials.companyName, "companyInfo");
  try {
    const res = await getDoc(infoRef);
    const perfStartDate = res.data().perfStartDate;
    console.log(JSON.stringify(res, undefined, 2));
    console.log(JSON.stringify(perfStartDate, undefined, 2));
    console.log("Performance review dates fetched successfully.");
    return perfStartDate;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    console.log("Failed to fetch performance review dates");
    return "";
  }
}

module.exports = fetchPerformanceReviewStartDate;
