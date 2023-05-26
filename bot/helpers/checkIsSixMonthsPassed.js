function checkIsSixMonthsPassed(date) {
  console.log("date: ", date);

  const startDate = new Date(date);
  const currentDate = new Date();
  const sixMonthsLater = new Date(startDate.setMonth(startDate.getMonth() + 6));
  return currentDate >= sixMonthsLater;
}

module.exports = checkIsSixMonthsPassed;
