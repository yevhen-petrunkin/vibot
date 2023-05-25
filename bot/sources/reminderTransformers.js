const activeManagerRemainderMeetingsTr = require("../helpers/dynamicReminderTransformers/activeManagerRemainderMeetingsTr");
const activeManagerRemainderSpecTr = require("../helpers/dynamicReminderTransformers/activeManagerRemainderSpecTr");
const activeManagerGoalSpecTr = require("../helpers/dynamicReminderTransformers/activeManagerGoalSpecTr");
const activeSpecRemainderPRTr = require("../helpers/dynamicReminderTransformers/activeSpecRemainderPRTr");
const activeSpecRemainderGoalTr = require("../helpers/dynamicReminderTransformers/activeSpecRemainderGoalTr");
const activeSpecRemainderGoalDLTr = require("../helpers/dynamicReminderTransformers/activeSpecRemainderGoalDLTr");
const answerUserNotJoyTr = require("../helpers/dynamicReminderTransformers/answerUserNotJoyTr");
const answerUserNotPlanTr = require("../helpers/dynamicReminderTransformers/answerUserNotPlanTr");

const reminderTransformers = [
  {
    verb: "activeManagerRemainderMeetings",
    operation: activeManagerRemainderMeetingsTr,
  },
  {
    verb: "activeManagerRemainderSpec",
    operation: activeManagerRemainderSpecTr,
  },
  {
    verb: "activeManagerGoalSpec",
    operation: activeManagerGoalSpecTr,
  },
  {
    verb: "activeSpecRemainderPR",
    operation: activeSpecRemainderPRTr,
  },
  {
    verb: "activeSpecRemainderGoal",
    operation: activeSpecRemainderGoalTr,
  },
  {
    verb: "activeSpecRemainderGoalDL",
    operation: activeSpecRemainderGoalDLTr,
  },
  {
    verb: "answerUserNotJoy",
    operation: answerUserNotJoyTr,
  },
  {
    verb: "answerUserNotPlan",
    operation: answerUserNotPlanTr,
  },
];

module.exports = { reminderTransformers };
