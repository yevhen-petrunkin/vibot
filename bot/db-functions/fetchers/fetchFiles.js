const { collection, getDocs } = require("firebase/firestore");
const { db } = require("../../firebase");
const fetchUserRole = require("./fetchUserRole")
const fetchAllSpecialistFiles = require("./fetchAllSpecialistFiles")
const fetchAllManagerFiles = require("./fetchAllManagerFiles")
const fetchGoalsByEmail = require("./fetchGoalsByEmail")

async function fetchFiles(credentials) {
  const userRole = await fetchUserRole(credentials);
  console.log(JSON.stringify(await fetchGoalsByEmail(credentials), undefined, 2));
  console.log("RoleInFilesFetch");
  console.log(JSON.stringify(userRole, undefined, 2));
  if(userRole === "specialist"){
    const finalFetch = await fetchAllSpecialistFiles(credentials);
    console.log("FinalFetch");
    console.log(JSON.stringify(finalFetch, undefined, 2));
    return finalFetch;
  }
  else if(userRole === "manager"){
    const finalFetch = await fetchAllManagerFiles(credentials);
    console.log("FinalFetch");
    console.log(JSON.stringify(finalFetch, undefined, 2));
    return finalFetch;
  }
}

module.exports = fetchFiles;
