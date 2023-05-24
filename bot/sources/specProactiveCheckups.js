const checkNearestPerfReviewDates = require("../helpers/specialistProactiveHelpers/checkNearestPerfReviewDates");
const checkPastPerfReviewDates = require("../helpers/specialistProactiveHelpers/checkPastPerfReviewDates");
const checkSpecGoalDeadlines = require("../helpers/specialistProactiveHelpers/checkSpecGoalDeadlines");

const specProactiveCheckups = [
  {
    verb: "activeSpecRemainderPR",
    checkup: checkNearestPerfReviewDates,
  },
  {
    verb: "activeSpecRemainderStudy",
    checkup: checkPastPerfReviewDates,
  },
  {
    verb: "activeSpecRemainderGoalDL",
    checkup: checkSpecGoalDeadlines,
  },
];

module.exports = { specProactiveCheckups };
