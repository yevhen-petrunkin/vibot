const fetchAllUsers = require("./fetchAllUsers");

async function fetchUsersByManagerEmail(credentials) {
  console.log("byManagerMain");
  const users = await fetchAllUsers(credentials);
  console.log(JSON.stringify(users, undefined, 2));
  if (!users.length) {
    return [];
  }

  let areSuchUsers = false;

  for(let i = 0; i < users.length; i++){
    if(users[i]['managerEmail'] === credentials.userEmail){
      areSuchUsers = true;
      break;
    }
  }

  //const areSuchUsers = await users.some(
  //  ({ managerEmail }) => credentials.email === managerEmail
  //);

  if (!areSuchUsers) {
    console.log("There are no users found with this manager.");
    return [];
  }
  console.log("Some users have been found with this manager."); 
  return await users.filter(({ managerEmail }) => credentials.userEmail === managerEmail); 
}

module.exports = fetchUsersByManagerEmail;
