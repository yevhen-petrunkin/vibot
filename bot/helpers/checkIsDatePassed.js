function checkIsDatePassed(date) {
  const currentDate = new Date();
  const receivedDate = new Date(date);

  currentDate.setHours(0, 0, 0, 0);
  receivedDate.setHours(0, 0, 0, 0);

  return currentDate >= receivedDate ? true : false;
}

module.exports = checkIsDatePassed;
