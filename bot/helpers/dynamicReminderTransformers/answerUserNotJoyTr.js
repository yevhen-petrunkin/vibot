function answerUserNotJoyTr(reminder) {
  try {
    const { survery, yourOptionText } = reminder.data;

    console.log("answerUserNotJoyTr: survey", survery);
    console.log("answerUserNotJoyTr: yourOptionText", yourOptionText);

    return [
      {
        type: "TextBlock",
        text: reminder.userName,
        weight: "bolder",
      },
      {
        type: "TextBlock",
        text: `Не задоволений карєрним планом тому що: ${survery}`,
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
    console.log("answerUserNotJoyTr: Failed to trnsform card.");
    return null;
  }
}

module.exports = answerUserNotJoyTr;
