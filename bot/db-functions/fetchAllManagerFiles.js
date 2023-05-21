const { collection, getDocs } = require("firebase/firestore");
const { db } = require("../firebase");

async function fetchAllManagerFiles(companyName) {
  const filesRef = collection(db, companyName, "companyFiles", "managerFiles");

  try {
    const files = await getDocs(filesRef);

    if (!files) {
      console.log(
        "There are no files in this directory yet. Return empty array."
      );
      return [];
    }
    const newArr = [];
    files.forEach((file) => {
      newArr.push(file.data());
    });
    console.log("All files obtained.");
    return newArr;
  } catch (error) {
    console.log(error.message);
    console.log("Failed to fetch files array. Return empty array.");
    return [];
  }
}

module.exports = fetchAllManagerFiles;
