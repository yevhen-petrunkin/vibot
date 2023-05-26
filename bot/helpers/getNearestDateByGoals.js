function getNearestDateByGoals(goals) {
  const currentDate = new Date();

  goals.sort((a, b) => {
    const dateA = new Date(a.deadline);
    const dateB = new Date(b.deadline);
    return Math.abs(dateA - currentDate) - Math.abs(dateB - currentDate);
  });

  const nearestDate = goals[0].deadline;

  return nearestDate;
}

module.exports = getNearestDateByGoals;
