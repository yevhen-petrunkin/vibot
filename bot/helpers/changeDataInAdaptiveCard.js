const {
  doc,
  updateDoc,
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

    default:
      return card;
  }
}

module.exports = changeDataInAdaptiveCard;
