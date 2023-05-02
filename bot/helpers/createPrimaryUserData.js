function createPrimaryUserData(context) {
  const { id, name } = context.activity.from;
  const userData = { name, id, stage: "hello" };
  return userData;
}

module.exports = createPrimaryUserData;
