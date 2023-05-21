const bcrypt = require("bcrypt");

function createKeyword(length) {
  console.log("Start generating keyword...");
  const saltRounds = 10;
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let keyword = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    keyword += characters.charAt(randomIndex);
  }

  const finalKeyword = bcrypt.hashSync(keyword, saltRounds);
  console.log(`End generating password: ${finalKeyword}`);
  return finalKeyword;
}

module.exports = createKeyword;
