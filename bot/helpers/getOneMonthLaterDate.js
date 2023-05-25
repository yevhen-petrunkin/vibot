function getOneMonthLaterDate(date) {
  const startDate = new Date(date);
  const oneMonthLaterDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + 1,
    startDate.getDate()
  );

  const year = oneMonthLaterDate.getFullYear();
  const month = String(oneMonthLaterDate.getMonth() + 1).padStart(2, "0");
  const day = String(oneMonthLaterDate.getDate()).padStart(2, "0");

  console.log("getOneMonthLaterDate: ", `${year}-${month}-${day}`);

  return `${year}-${month}-${day}`;
}

module.exports = getOneMonthLaterDate;
