const checkNearestPerfReviewForManager = require("../helpers/managerProactiveHelpers/checkNearestPerfReviewForManager");

const managerProactiveCheckups = [
  {
    verb: "activeManagerRemainderMeetings",
    checkup: checkNearestPerfReviewForManager,
  },
];

module.exports = { managerProactiveCheckups };
