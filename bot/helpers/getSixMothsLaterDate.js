function getSixMothsLaterDate(date) {
  const startDate = new Date(date);
  const laterDate = new Date(startDate.setMonth(startDate.getMonth() + 6));

  const year = laterDate.getFullYear();
  const month = String(laterDate.getMonth() + 1).padStart(2, "0");
  const day = String(laterDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

module.exports = getSixMothsLaterDate;
