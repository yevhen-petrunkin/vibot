const { createUserWithEmailAndPassword } = require("firebase/auth");
const { auth } = require("../firebase");

async function createAdminAccount(context) {
  const adminPassword = context.activity.from.id;
  const { adminEmail } = context.activity.value.action.data;

  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      adminEmail,
      adminPassword
    );
    console.log("Admin Account has been registered successfully.");
    return user;
  } catch (error) {
    console.log(error.message);
    await context.sendActivity(
      "Не вдалося створити акаунт з невідомої причини. \n Можливо, акаунт з таким email вже є в базі даних. Спробуй інший. \n Для продовження введи команду “Hello”."
    );
  }
}

module.exports = createAdminAccount;
