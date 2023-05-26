function getNearestFirstDayOfMonth() {
  const currentDate = new Date();

  const dateArray = [];
  for (let month = 0; month < 12; month++) {
    dateArray.push(new Date(currentDate.getFullYear(), month, 1));
  }

  let nearestDate = dateArray[0];
  let nearestDiff = Math.abs(nearestDate - currentDate);
  for (let i = 1; i < dateArray.length; i++) {
    let diff = Math.abs(dateArray[i] - currentDate);
    if (diff < nearestDiff) {
      nearestDiff = diff;
      nearestDate = dateArray[i];
    }
  }

  const year = nearestDate.getFullYear();
  const month = (nearestDate.getMonth() + 1).toString().padStart(2, "0");
  const day = nearestDate.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

module.exports = getNearestFirstDayOfMonth;
