function splitSpecialistAndManager(verb) {
  switch (verb.toLowerCase()) {
    case "userdataspecialist":
      return "managerEmail";
    case "userdatamanager":
      return "managerFileSending";
  }
}

module.exports = splitSpecialistAndManager;
