function findAdaptiveCard(word, arr) {
  const isSuchCard = arr.some(({ keyword }) => word === keyword);
  if (isSuchCard) {
    return arr.find(({ keyword }) => word === keyword);
  }
  return null;
}

module.exports = findAdaptiveCard;
