const checkIsSixMonthsPassed = require("./checkIsSixMonthsPassed");

function splitPlanPathByDate(date) {
  return checkIsSixMonthsPassed(date) ? "startPlan" : "helpPlan";
}

module.exports = splitPlanPathByDate;
