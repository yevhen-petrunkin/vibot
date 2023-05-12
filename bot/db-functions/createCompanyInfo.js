const { doc, setDoc, serverTimestamp } = require("firebase/firestore");
const { db } = require("../firebase");

async function createCompanyInfo(contextData) {
  const {
    companyName,
    perfFirstStartDate,
    perfFirstEndDate,
    perfSecondStartDate,
    perfSecondEndDate,
  } = contextData.value.action.data;
  const companyInfo = {
    companyName,
    firstPerfReviewPeriod: {
      startPerfReviewDate: perfFirstStartDate,
      endPerfReviewDate: perfFirstEndDate,
    },
    secondPerfReviewPeriod: {
      startPerfReviewDate: perfSecondStartDate,
      endPerfReviewDate: perfSecondEndDate,
    },
    timeStamp: serverTimestamp(),
  };
  const companyInfoRef = doc(db, companyName, "companyInfo");
  try {
    await setDoc(companyInfoRef, companyInfo);
    console.log("Company Info Created");
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = createCompanyInfo;
