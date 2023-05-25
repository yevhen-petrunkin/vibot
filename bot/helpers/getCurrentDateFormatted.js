function getCurrentDateFormatted() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  console.log("getCurrentDateFormatted: ", `${year}-${month}-${day}`);

  return `${year}-${month}-${day}`;
}

module.exports = getCurrentDateFormatted;
