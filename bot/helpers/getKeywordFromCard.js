function getKeywordFromCard(card) {
  if (
    typeof card === "object" &&
    Object.keys(card.template).includes("keyword")
  ) {
    return card.template.keyword;
  }
  console.log(
    "Something wrong with the incoming card data. It either is not of an object type or the object does not contain keyword."
  );
}

module.exports = getKeywordFromCard;
