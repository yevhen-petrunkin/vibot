function getFormattedDateFromDate(date) {
  const parts = date.split("-");
  const day = parts[2];
  const month = parts[1];
  const year = parts[0];

  console.log("getFormattedDateFromDate: ", `${day}.${month}.${year}`);

  return `${day}.${month}.${year}`;
}

module.exports = getFormattedDateFromDate;
