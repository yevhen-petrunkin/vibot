function splitSpecialistAndManager(verb) {
  switch (verb) {
    case "userDataSpecialist":
      return "managerEmail";
    case "userDataManager":
      return "managerFileSending";
  }
}

module.exports = splitSpecialistAndManager;
