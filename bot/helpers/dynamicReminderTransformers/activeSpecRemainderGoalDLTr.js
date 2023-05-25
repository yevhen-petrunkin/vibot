function activeSpecRemainderGoalDLTr(reminder) {
  try {
    const goals = reminder.data;

    console.log("activeSpecRemainderGoalDLTr: goals", goals);

    const newGoals = goals.map(({ name }) => {
      return {
        type: "TextBlock",
        text: name,
        wrap: true,
        weight: "bolder",
      };
    });

    console.log("activeSpecRemainderGoalDLTr: newGoals", newGoals);

    newGoals.push({
      type: "TextBlock",
      text: "Вітаю, в тебе вийшов дедлайн. Чи вдалося досягнути цілі? 😉",
      wrap: true,
    });

    console.log("activeSpecRemainderGoalDLTr: newGoals at end", newGoals);

    return newGoals;
  } catch (error) {
    console.log(error.message);
    console.log("activeSpecRemainderGoalDLTr: Failed to trnsform card.");
    return null;
  }
}

module.exports = activeSpecRemainderGoalDLTr;
