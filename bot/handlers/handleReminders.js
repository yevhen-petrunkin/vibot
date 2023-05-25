const showAdaptiveCardByVerb = require("../actions/showAdaptiveCardByVerb");
const updateAllReminders = require("../db-functions/updateAllReminders");
const updateRemindersByEmail = require("../db-functions/updateRemindersByEmail");
const handleReminderReplyMessages = require("./handleReminderReplyMessages");
const checkIsDatePassed = require("../helpers/checkIsDatePassed");
const getTomorrowDate = require("../helpers/getTomorrowDate");
const getOneWeekLaterDate = require("../helpers/getOneWeekLaterDate");
const createSpecGoalDeadlineReminder = require("../helpers/managerProactiveHelpers/createSpecGoalDeadlineReminder");
const getNearestFirstDayOfMonthFromDate = require("../helpers/getNearestFirstDayOfMonthFromDate");
const getNearestQuarterDateFromDate = require("../helpers/getNearestQuarterDateFromDate");

async function handleReminders(verb, config) {
  try {
    const { context, credentials, reminders, reminderIndex } = config;
    const { userEmail, userReminders, companyName } = credentials;
    const reminder = reminders[reminderIndex];
    console.log("handleReminders: reminder", reminder);

    let newUserReminders = [...userReminders];
    let newReminders = [...reminders];
    let newVerb = "";
    let newTriggerDate = "";
    let newReminder = {};

    switch (verb.toLowerCase()) {
      case "messageOk".toLowerCase():
        reminder.complete = true;
        newReminders.splice(reminderIndex, 1, reminder);
        newVerb = "messageOkMessage";
        await handleReminderReplyMessages(newVerb, context);
        console.log("messageOk: activated ");
        console.log("handleReminders: reminder after action", reminder);
        break;

      case "activeLiter".toLowerCase():
        newVerb = "activeLiter";
        await showAdaptiveCardByVerb(newVerb, context);
        console.log("activeLiter: activated ");
        break;

      case "activeWroteDown".toLowerCase():
        newVerb = "activeWroteDown";
        await showAdaptiveCardByVerb(newVerb, context);
        console.log("activeLiter: activated ");
        break;

      case "remindTomorrow".toLowerCase():
        newTriggerDate = getTomorrowDate();
        reminder.triggerDate = newTriggerDate;
        newReminders.splice(reminderIndex, 1, reminder);
        newVerb = "activeWroteDown";
        await showAdaptiveCardByVerb(newVerb, context);
        console.log("remindTomorrow: activated ");
        console.log("handleReminders: reminder after action", reminder);
        break;

      case "remindInAWeek".toLowerCase():
        newTriggerDate = getOneWeekLaterDate();
        reminder.triggerDate = newTriggerDate;
        newReminders.splice(reminderIndex, 1, reminder);
        console.log("User Reminders Before Next Card", newUserReminders);
        newVerb = "activeWroteDown";
        await showAdaptiveCardByVerb(newVerb, context);
        console.log("remindInAWeek: activated ");
        console.log("handleReminders: reminder after action", reminder);

        break;

      case "prolongUntilNextQuarter".toLowerCase():
        newTriggerDate = getNearestQuarterDateFromDate(reminder.triggerDate);
        reminder.triggerDate = newTriggerDate;
        newReminders.splice(reminderIndex, 1, reminder);
        newVerb = "messageOkMessage";
        await handleReminderReplyMessages(newVerb, context);
        console.log("prolongUntilNextQuarter: activated ");
        console.log("handleReminders: reminder after action", reminder);
        break;

      case "prolongUntilNextMonth".toLowerCase():
        newTriggerDate = getNearestFirstDayOfMonthFromDate(
          reminder.triggerDate
        );
        reminder.triggerDate = newTriggerDate;
        newReminders.splice(reminderIndex, 1, reminder);
        console.log("prolongUntilNextMonth: activated ");
        console.log("handleReminders: reminder after action", reminder);
        break;

      case "prolongUntilNextMonthAndCheck".toLowerCase():
        newTriggerDate = getNearestFirstDayOfMonthFromDate(
          reminder.triggerDate
        );
        reminder.triggerDate = newTriggerDate;
        newReminders.splice(reminderIndex, 1, reminder);
        newVerb = "checkPlans";
        await showAdaptiveCardByVerb(newVerb, context);
        console.log("prolongUntilNextMonthAndCheck: activated ");
        console.log("handleReminders: reminder after action", reminder);
        break;

      case "untilNextQuarterYes".toLowerCase():
        newTriggerDate = getNearestQuarterDateFromDate(reminder.triggerDate);
        reminder.triggerDate = newTriggerDate;
        newReminders.splice(reminderIndex, 1, reminder);
        newVerb = "perfReviewNote";
        await showAdaptiveCardByVerb(newVerb, context);
        console.log("untilNextQuarterYes: activated ");
        console.log("handleReminders: reminder after action", reminder);
        break;

      case "untilNextQuarterNo".toLowerCase():
        newTriggerDate = getNearestQuarterDateFromDate(reminder.triggerDate);
        reminder.triggerDate = newTriggerDate;
        newReminders.splice(reminderIndex, 1, reminder);
        newVerb = "askNotJoy";
        await showAdaptiveCardByVerb(newVerb, context);
        console.log("untilNextQuarterNo: activated ");
        console.log("handleReminders: reminder after action", reminder);
        break;

      case "ifHasPlanYes".toLowerCase():
        reminder.complete = true;
        newReminders.splice(reminderIndex, 1, reminder);
        newVerb = "checkPlanJoy";
        await showAdaptiveCardByVerb(newVerb, context);
        console.log("ifHasPlanYes: activated ");
        console.log("handleReminders: reminder after action", reminder);
        break;

      case "ifHasPlanNo".toLowerCase():
        reminder.complete = true;
        newReminders.splice(reminderIndex, 1, reminder);
        newVerb = "askAboutPlan";
        await showAdaptiveCardByVerb(newVerb, context);
        console.log("ifHasPlanNo: activated ");
        console.log("handleReminders: reminder after action", reminder);
        break;

      case "changePerfDates".toLowerCase():
        reminder.complete = true;
        newReminders.splice(reminderIndex, 1, reminder);
        newVerb = "setPerfDates";
        await showAdaptiveCardByVerb(newVerb, context);
        console.log("changePerfDates: activated ");
        console.log("handleReminders: reminder after action", reminder);
        break;

      case "editGoals".toLowerCase():
        newReminder = await createSpecGoalDeadlineReminder(
          context,
          credentials
        );
        await updateRemindersByEmail(
          credentials.managerEmail,
          newReminder,
          config
        );
        newVerb = "checkPlans";
        await showAdaptiveCardByVerb(newVerb, context);
        console.log("editGoals: activated ");
        break;
    }

    const unusedUserReminders = await userReminders.filter(
      ({ triggerDate }) => !checkIsDatePassed(triggerDate)
    );

    console.log("handleReminders: unusedUserReminders", unusedUserReminders);

    const filteredNewReminders = await newReminders.filter(
      ({ complete }) => !complete
    );

    console.log("handleReminders: filteredNewReminders", filteredNewReminders);

    const aggrReminders = [...filteredNewReminders, ...unusedUserReminders];

    console.log("handleReminders: aggrReminders", aggrReminders);

    await updateAllReminders(userEmail, aggrReminders, companyName);

    console.log(
      `Processed reminder action ${verb} successfully. Processed reminders: ${newReminders}`
    );

    console.log("handleReminders: newReminders", newReminders);

    return newReminders;
  } catch (error) {
    console.log(error.message);
    console.log(
      `Failed to process reminder ${verb}. Return unprocessed reminders.`
    );
    return reminders;
  }
}

module.exports = handleReminders;
