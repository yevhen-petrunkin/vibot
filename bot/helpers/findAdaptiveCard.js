function findAdaptiveCard(word, arr) {
  const isSuchCard = arr.some(
    ({ keyword }) => word.toLowerCase() === keyword.toLowerCase()
  );
  if (isSuchCard) {
    return arr.find(
      ({ keyword }) => word.toLowerCase() === keyword.toLowerCase()
    );
  }
  return null;
}

module.exports = findAdaptiveCard;
