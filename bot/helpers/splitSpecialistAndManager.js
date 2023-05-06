function splitSpecialistAndManager(verb) {
  switch (verb.toLowerCase()) {
    case "userDataSpecialist".toLowerCase():
      return "managerEmail";
    case "userDataManager".toLowerCase():
      return "managerFileSending";
  }
}

module.exports = splitSpecialistAndManager;
