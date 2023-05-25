const getFormattedDateFromDate = require("../getFormattedDateFromDate");

function activeSpecRemainderPRTr(reminder) {
  try {
    const { perfStartDate, perfEndDate } = reminder.data;
    const startDate = getFormattedDateFromDate(perfStartDate);
    const endDate = getFormattedDateFromDate(perfEndDate);

    return [
      {
        type: "Image",
        url: "https://i.ibb.co/qdBG7vZ/image.png",
        altText: "VBot",
        size: "stretch",
      },
      {
        type: "TextBlock",
        text: `Привіт! Нагадую, що найближче Performance Review буде з ${startDate} по ${endDate}`,
        wrap: true,
        weight: "bolder",
      },
      {
        type: "TextBlock",
        text: "💡 Performance Review дозволяє отримати об'єктивну оцінку своєї роботи та досягнень, ідентифікувати свої сильні та слабкі сторони, а також отримати цінні рекомендації щодо поліпшення своєї професійної діяльності. ",
        wrap: true,
      },
      {
        type: "TextBlock",
        text: "Якщо в тебе виникли питання, зв’яжися зі своїм менеджером.",
        wrap: true,
        weight: "bolder",
      },
    ];
  } catch (error) {
    console.log(error.message);
    console.log("activeSpecRemainderPRTr: Failed to transform card.");
    return null;
  }
}

module.exports = activeSpecRemainderPRTr;
