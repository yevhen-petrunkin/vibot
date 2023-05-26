function getOneWeekLaterDate() {
  const startDate = new Date();
  const weekLaterDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);

  const year = weekLaterDate.getFullYear();
  const month = String(weekLaterDate.getMonth() + 1).padStart(2, "0");
  const day = String(weekLaterDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

module.exports = getOneWeekLaterDate;
