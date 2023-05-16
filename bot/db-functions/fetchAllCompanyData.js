const { collection, getDocs } = require("firebase/firestore");
const { db } = require("../firebase");
const fetchAllUsers = require("./fetchAllUsers");

async function fetchAllCompanyData(companyName) {
  const dataRef = collection(db, companyName);
  try {
    const dataArr = await getDocs(dataRef);
    const userArr = await fetchAllUsers(companyName);

    if (!dataArr || !userArr) {
      console.log("Some data for the company is missing. Return empty array.");
      return [];
    }

    const compData = {};
    dataArr.forEach((section) => {
      compData[section.id] = section.data();
    });

    const companyObj = { ...compData, companyUsers: userArr };

    console.log("Collection: ", companyObj);
    console.log("All company data obtained.");
    return companyObj;
  } catch (error) {
    console.log(error.message);
    console.log("Failed to fetch data for this company. Return empty array.");
    return [];
  }
}

module.exports = fetchAllCompanyData;
