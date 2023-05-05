function createPrimaryUserData(data) {
  const { id, name } = data.from;
  const userData = { name, id, stage: "hello" };
  return userData;
}

module.exports = createPrimaryUserData;
