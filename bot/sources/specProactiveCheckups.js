const checkNearestPerfReviewDates = require("../helpers/specialistProactiveHelpers/checkNearestPerfReviewDates");
const checkPastPerfReviewDates = require("../helpers/specialistProactiveHelpers/checkPastPerfReviewDates");

const specProactiveCheckups = [
  {
    verb: "activeSpecRemainderPR",
    checkup: checkNearestPerfReviewDates,
  },
  {
    verb: "activeSpecRemainderStudy",
    checkup: checkPastPerfReviewDates,
  },
];

module.exports = { specProactiveCheckups };
