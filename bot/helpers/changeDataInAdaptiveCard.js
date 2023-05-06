const {
  doc,
  updateDoc,
  getDoc,
  collection,
  getDocs,
  serverTimestamp,
} = require("firebase/firestore");
const { db } = require("../firebase.js");

async function changeDataInAdaptiveCard(card, data, userId) {
  switch (card.keyword.toLowerCase()) {
    // case "yourkeywordinlowercase":

    //   let necessaryData = data.value.action.data.yourValue;
    //   if (!necessaryData) {
    //     await "get necessary data from firebase by userId";
    //   }
    //   await "your actions with card using necessary data";
    //   return card;

    case "userdata":
      const userName = data.from.name;
      let userData = {};
      let isSuchData = false;

      if (data.type === "invoke") {
        userData = data.value.action.data;
        const keyArr = Object.keys(userData);
        isSuchData =
          keyArr.includes("userEmail") && keyArr.includes("userStartDate");
      }

      if (data.type === "message" || !isSuchData) {
        const userRef = doc(db, "users", userId);
        const res = await getDoc(userRef);
        userData = res.data();
      }

      const { userEmail, userStartDate } = userData;

      const cardFactSet = {
        type: "FactSet",
        facts: [
          {
            title: "Name",
            value: userName,
          },
          {
            title: "Email",
            value: userEmail,
          },
          {
            title: "Date",
            value: userStartDate,
          },
        ],
      };

      const cardBody = [...card.body];
      cardBody.splice(1, 1, cardFactSet);
      card.body = cardBody;

      return card;

    default:
      return card;
  }
}

module.exports = changeDataInAdaptiveCard;
