const checkNearestPerfReviewDates = require("../helpers/specialistProactiveHelpers/checkNearestPerfReviewDates");

const specProactiveCheckups = [
  {
    verb: "activeSpecRemainderPR",
    checkup: checkNearestPerfReviewDates,
  },
];

module.exports = { specProactiveCheckups };
