function normalizeMessageText(text) {
  if (text) {
    return text.toLowerCase().replace(/\n|\r/g, "").trim();
  }
  return;
}

module.exports = { normalizeMessageText };
