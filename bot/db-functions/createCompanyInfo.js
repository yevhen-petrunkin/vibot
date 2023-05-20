const { doc, setDoc } = require("firebase/firestore");
const { db } = require("../firebase");

async function createCompanyInfo(contextData) {
  const { companyName, perfStartDate, perfEndDate } =
    contextData.value.action.data;

  const companyInfo = {
    companyName,
    perfStartDate,
    perfEndDate,
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
