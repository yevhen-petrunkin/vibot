const { collection, getDocs } = require("firebase/firestore");
const { db } = require("../firebase");
const fetchAllUsers = require("./fetchAllUsers");
const fetchAllSpecialistFiles = require("./fetchAllSpecialistFiles");
const fetchAllManagerFiles = require("./fetchAllManagerFiles");

async function fetchAllCompanyData(companyName) {
  const dataRef = collection(db, companyName);
  try {
    const dataArr = await getDocs(dataRef);
    const userArr = await fetchAllUsers(companyName);
    const specFilesArr = await fetchAllSpecialistFiles(companyName);
    const managFilesArr = await fetchAllManagerFiles(companyName);

    if (!dataArr || !userArr) {
      console.log("Some data for the company is missing. Return empty array.");
      return {};
    }

    const compData = {};
    dataArr.forEach((section) => {
      compData[section.id] = section.data();
    });

    const companyObj = {
      ...compData,
      companyUsers: userArr,
      companyFiles: {
        specialistFiles: specFilesArr,
        managerFiles: managFilesArr,
      },
    };

    console.log("Collection: ", companyObj);
    console.log("All company data obtained.");
    return companyObj;
  } catch (error) {
    console.log(error.message);
    console.log("Failed to fetch data for this company. Return empty array.");
    return {};
  }
}

module.exports = fetchAllCompanyData;
