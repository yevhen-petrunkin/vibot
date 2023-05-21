function checkTransferToOtherCard(endpoints, verb) {
  return endpoints.some(
    (endpoint) => verb.toLowerCase() === endpoint.toLowerCase()
  );
}

module.exports = checkTransferToOtherCard;
