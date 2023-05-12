const { onAuthStateChanged } = require("firebase/auth");
const { auth } = require("../firebase");

function observeAuthState() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          console.log("ObserveAuthState: User is logged in");
          resolve(user);
        } else {
          resolve(null);
        }
      },
      reject
    );
  });
}

module.exports = observeAuthState;
