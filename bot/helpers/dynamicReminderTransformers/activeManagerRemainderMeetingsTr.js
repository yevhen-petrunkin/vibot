const getFormattedDateFromDate = require("../getFormattedDateFromDate");

function activeManagerRemainderMeetingsTr(reminder) {
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
        text: `Найближче Performance Review буде з ${startDate} по ${endDate}`,
        wrap: true,
        weight: "bolder",
      },
      {
        type: "TextBlock",
        text: "Ти проводив зустрічі зі спеціалістами?",
        wrap: true,
      },
    ];
  } catch (error) {
    console.log(error.message);
    console.log("activeManagerRemainderMeetingsTr: Failed to trnsform card.");
    return null;
  }
}

module.exports = activeManagerRemainderMeetingsTr;
