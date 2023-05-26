function getNearestQuarterDate() {
  const currentDate = new Date();
  const january1st = new Date(currentDate.getFullYear(), 0, 1);
  const april1st = new Date(currentDate.getFullYear(), 3, 1);
  const july1st = new Date(currentDate.getFullYear(), 6, 1);
  const october1st = new Date(currentDate.getFullYear(), 9, 1);

  const dateArray = [january1st, april1st, july1st, october1st];

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

module.exports = getNearestQuarterDate;
