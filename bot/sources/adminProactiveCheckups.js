const checkPerfReviewDates = require("../helpers/adminProactiveHelpers/checkPerfReviewDates");

const adminProactiveCheckups = [
  {
    verb: "activeAdminRemainderUpdatePR",
    checkup: checkPerfReviewDates,
  },
];

module.exports = { adminProactiveCheckups };
