function createPrimaryUserData(data) {
  const { id, name } = data.from;
  const userData = { userName: name, teamsId: id };
  return userData;
}

module.exports = createPrimaryUserData;
