function answerUserNotPlanTr(reminder) {
  try {
    const { survery, yourOptionText } = reminder.data;

    console.log("answerUserNotPlanTr: survey", survery);
    console.log("answerUserNotPlanTr: yourOptionText", yourOptionText);

    return [
      {
        type: "TextBlock",
        text: reminder.userName,
        weight: "bolder",
      },
      {
        type: "TextBlock",
        text: `Не хоче кар'єрний план тому що: ${survery}`,
        wrap: true,
      },
      {
        type: "TextBlock",
        text: yourOptionText,
        wrap: true,
      },
    ];
  } catch (error) {
    console.log(error.message);
    console.log("answerUserNotPlanTr: Failed to trnsform card.");
    return null;
  }
}

module.exports = answerUserNotPlanTr;
