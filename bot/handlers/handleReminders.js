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
        break;

      case "activeLiter".toLowerCase():
        newVerb = "activeLiter";
        await showAdaptiveCardByVerb(newVerb, context);
        break;

      case "activeWroteDown".toLowerCase():
        newVerb = "activeWroteDown";
        await showAdaptiveCardByVerb(newVerb, context);
        break;

      case "remindTomorrow".toLowerCase():
        newTriggerDate = getTomorrowDate();
        reminder.triggerDate = newTriggerDate;
        newReminders.splice(reminderIndex, 1, reminder);
        newVerb = "activeWroteDown";
        await showAdaptiveCardByVerb(newVerb, context);
        break;

      case "remindInAWeek".toLowerCase():
        newTriggerDate = getOneWeekLaterDate();
        reminder.triggerDate = newTriggerDate;
        newReminders.splice(reminderIndex, 1, reminder);
        newVerb = "activeWroteDown";
        await showAdaptiveCardByVerb(newVerb, context);
        break;

      case "prolongUntilNextQuarter".toLowerCase():
        newTriggerDate = getNearestQuarterDateFromDate(reminder.triggerDate);
        reminder.triggerDate = newTriggerDate;
        newReminders.splice(reminderIndex, 1, reminder);
        newVerb = "messageOkMessage";
        await handleReminderReplyMessages(newVerb, context);
        break;

      case "prolongUntilNextMonth".toLowerCase():
        newTriggerDate = getNearestFirstDayOfMonthFromDate(
          reminder.triggerDate
        );
        reminder.triggerDate = newTriggerDate;
        newReminders.splice(reminderIndex, 1, reminder);
        break;

      case "prolongUntilNextMonthAndCheck".toLowerCase():
        newTriggerDate = getNearestFirstDayOfMonthFromDate(
          reminder.triggerDate
        );
        reminder.triggerDate = newTriggerDate;
        newReminders.splice(reminderIndex, 1, reminder);
        newVerb = "checkPlans";
        await showAdaptiveCardByVerb(newVerb, context);
        break;

      case "untilNextQuarterYes".toLowerCase():
        newTriggerDate = getNearestQuarterDateFromDate(reminder.triggerDate);
        reminder.triggerDate = newTriggerDate;
        newReminders.splice(reminderIndex, 1, reminder);
        newVerb = "perfReviewNote";
        await showAdaptiveCardByVerb(newVerb, context);
        break;

      case "untilNextQuarterNo".toLowerCase():
        newTriggerDate = getNearestQuarterDateFromDate(reminder.triggerDate);
        reminder.triggerDate = newTriggerDate;
        newReminders.splice(reminderIndex, 1, reminder);
        newVerb = "askNotJoy";
        await showAdaptiveCardByVerb(newVerb, context);
        break;

      case "ifHasPlanYes".toLowerCase():
        reminder.complete = true;
        newReminders.splice(reminderIndex, 1, reminder);
        newVerb = "checkPlanJoy";
        await showAdaptiveCardByVerb(newVerb, context);
        break;

      case "ifHasPlanNo".toLowerCase():
        reminder.complete = true;
        newReminders.splice(reminderIndex, 1, reminder);
        newVerb = "askAboutPlan";
        await showAdaptiveCardByVerb(newVerb, context);
        break;

      case "changePerfDates".toLowerCase():
        reminder.complete = true;
        newReminders.splice(reminderIndex, 1, reminder);
        newVerb = "setPerfDates";
        await showAdaptiveCardByVerb(newVerb, context);
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
        break;
    }

    const unusedUserReminders = await userReminders.filter(
      ({ triggerDate }) => !checkIsDatePassed(triggerDate)
    );

    const filteredNewReminders = await newReminders.filter(
      ({ complete }) => !complete
    );

    const aggrReminders = [...filteredNewReminders, ...unusedUserReminders];

    await updateAllReminders(userEmail, aggrReminders, companyName);

    console.log(`Processed reminder action ${verb} successfully.`);

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
