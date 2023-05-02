function findCommandStageByUserId(userId, arr) {
  const isSuchUser = arr.some(({ id }) => id === userId);
  if (isSuchUser) {
    const user = arr.find(({ id }) => id === userId);
    return user.data.stage;
  }
  return "hello";
}

module.exports = findCommandStageByUserId;
