function getTomorrowDate() {
  const startDate = new Date();
  const tomorrowDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);

  const year = tomorrowDate.getFullYear();
  const month = String(tomorrowDate.getMonth() + 1).padStart(2, "0");
  const day = String(tomorrowDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

module.exports = getTomorrowDate;
