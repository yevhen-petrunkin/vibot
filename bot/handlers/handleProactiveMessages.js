const { adminProactiveCheckups } = require("../sources/adminProactiveCheckups");
const { specProactiveCheckups } = require("../sources/specProactiveCheckups");
const {
  managerProactiveCheckups,
} = require("../sources/managerProactiveCheckups");
const createReminderArray = require("../helpers/createReminderArray");

async function handleProactiveMessages(context, credentials) {
  try {
    const { userRole } = await credentials;
    console.log("Checking if there are any notifications...");

    if (userRole.toLowerCase() === "specialist".toLowerCase()) {
      return await createReminderArray({
        sourceArr: specProactiveCheckups,
        context,
        credentials,
      });
    }

    if (userRole.toLowerCase() === "manager".toLowerCase()) {
      return await createReminderArray({
        sourceArr: managerProactiveCheckups,
        context,
        credentials,
      });
    }

    if (userRole.toLowerCase() === "admin".toLowerCase()) {
      return await createReminderArray({
        sourceArr: adminProactiveCheckups,
        context,
        credentials,
      });
    }
    console.log(
      "handleProactiveMessages: userRole did not match any options. Return empty array."
    );
    return [];
  } catch (error) {
    console.log(error.message);
    console.log("Failed to obtain reminder array. Return empty array.");
    return [];
  }
}

module.exports = handleProactiveMessages;
