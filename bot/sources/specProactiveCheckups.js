const checkPerfReviewDates = require("../helpers/adminProactiveHelpers/checkPerfReviewDates");

const specProactiveCheckups = [
  {
    verb: "activeManagerRemainMeetings",
    checkup: checkPerfReviewDates, // тимчасова функція-заглушка
  },
];

module.exports = { specProactiveCheckups };
