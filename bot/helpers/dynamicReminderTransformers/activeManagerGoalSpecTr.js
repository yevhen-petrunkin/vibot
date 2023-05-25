function activeManagerGoalSpecTr(reminder) {
  try {
    return [
      {
        type: "Image",
        url: "https://i.ibb.co/qdBG7vZ/image.png",
        altText: "VBot",
        size: "stretch",
      },
      {
        type: "TextBlock",
        text: `Привіт! У спеціаліста ${reminder.userName} завершився дедлайн по цілі.`,
        wrap: true,
        weight: "bolder",
      },
      {
        type: "TextBlock",
        text: "Запитайся чи все вийшло 😉",
        wrap: true,
      },
    ];
  } catch (error) {
    console.log(error.message);
    console.log("activeManagerGoalSpecTr: Failed to trnsform card.");
    return null;
  }
}

module.exports = activeManagerGoalSpecTr;
