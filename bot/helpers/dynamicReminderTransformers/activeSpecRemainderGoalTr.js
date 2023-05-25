const getFormattedDateFromDate = require("../getFormattedDateFromDate");

function activeSpecRemainderGoalTr(reminder) {
  try {
    const goals = reminder.data;

    console.log("activeSpecRemainderGoalTr: goals", goals);

    const initialBody = [
      {
        type: "TextBlock",
        text: "Привіт! Нагадую про твої цілі",
        size: "large",
        weight: "bolder",
      },
    ];

    const newGoals = goals.map(({ name, deadline }) => {
      const formattedDate = getFormattedDateFromDate(deadline);
      return [
        {
          type: "TextBlock",
          text: name,
          wrap: true,
          weight: "bolder",
        },
        {
          type: "FactSet",
          facts: [
            {
              title: "Дедлайн:",
              value: formattedDate,
            },
          ],
        },
      ];
    });

    console.log("activeSpecRemainderGoalTr: newGoals", newGoals);

    const flatGoals = newGoals.flat();
    flatGoals.forEach((elem) => initialBody.push(elem));

    console.log("activeSpecRemainderGoalTr: flatGoals", flatGoals);

    initialBody.push({
      type: "TextBlock",
      text: "💡 Карʼєрний план - це інструмент, який допомагає знайти найкращу відповідність між особистими цілями, навиками спеціаліста та можливостями, що є у компанії.",
      wrap: true,
    });

    console.log("activeSpecRemainderGoalTr: initialBody at end", initialBody);

    return initialBody;
  } catch (error) {
    console.log(error.message);
    console.log("activeSpecRemainderGoalTr: Failed to trnsform card.");
    return null;
  }
}

module.exports = activeSpecRemainderGoalTr;
