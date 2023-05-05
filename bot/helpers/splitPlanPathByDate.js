function splitPlanPathByDate(date) {
  const startDate = new Date(date);
  const currentDate = new Date();
  const sixMonthsLater = new Date(startDate.setMonth(startDate.getMonth() + 6));
  const didSixMonthsPass = currentDate >= sixMonthsLater;

  return didSixMonthsPass ? "startPlan" : "helpPlan";
}

module.exports = splitPlanPathByDate;
