const { reminderEndpoints } = require("../sources/reminderEndpoints");

function checkIsReminder(verb) {
  return reminderEndpoints.some(
    (endpoint) => endpoint.toLowerCase() === verb.toLowerCase()
  );
}

module.exports = checkIsReminder;
