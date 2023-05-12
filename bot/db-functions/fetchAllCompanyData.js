const { collection, getDocs } = require("firebase/firestore");
const { db } = require("../firebase");

async function fetchAllCompanyData(companyName) {
  const dataRef = collection(db, companyName);
  try {
    const dataArr = await getDocs(dataRef);

    if (!dataArr || !dataArr.length) {
      console.log("There is no data for this company. Return empny array");
      return [];
    }

    ("All company data obtained.");
    return await dataArr.map((section) => section.data());
  } catch (error) {
    console.log(error.message);
    console.log("Failed to fetch data for this company. Return empty array.");
    return [];
  }
}

module.exports = fetchAllCompanyData;
