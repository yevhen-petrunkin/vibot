function getWeekEarlierDate(date) {
  const startDate = new Date(date);
  const earlierDate = new Date(startDate.getTime() - 7 * 24 * 60 * 60 * 1000);

  const year = earlierDate.getFullYear();
  const month = String(earlierDate.getMonth() + 1).padStart(2, "0");
  const day = String(earlierDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

module.exports = getWeekEarlierDate;
