const getCurrentDateFormatted = require("../getCurrentDateFormatted");

async function createMessageFromFromData(verb, contextData, credentials) {
  try {
    const { userEmail } = await credentials;
    const userName = await contextData.from.name;
    const formData = contextData.value.action.data;

    const currentDate = getCurrentDateFormatted();

    return {
      userEmail,
      userName,
      verb,
      triggerDate: currentDate,
      data: formData,
      complete: true,
    };
  } catch (error) {
    console.log(error.message);
    console.log("createMessageFromFromData: Failed to create reminder.");
    return null;
  }
}

module.exports = createMessageFromFromData;
