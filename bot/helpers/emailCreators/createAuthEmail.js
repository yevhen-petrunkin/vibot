function createAuthEmail({ recipientEmail, authEmail, authKeyword, link }) {
  return {
    from: "<kovcheg_xxi_koval@ukr.net>",
    to: recipientEmail,
    subject: "Bot V7Pro by Viseven company",
    text: `Привіт!
      V7Pro - це кар'єрний помічник від Viseven, який допомогає в професійному
      розвитку. Для того, щоб почати роботу в боті необхідно:
    1. Встановити бота за посиланням 2. Зареєструватись. Адміністратор вже створив тобі обліковий запис,
      все що тобі потрібно, це вперше вказати електронну адресу та секретний
      пароль у боті в Microsoft Teams. Email: ${authEmail}
    Пароль: ${authKeyword} Не передавайте свої дані іншим особам!
      3. Розпочати роботу. Рекомендуємо спочтаку ознайомитись з
      інструкцією по використанню боту та подивитись промо-відео.    
    Давай зробимо перший крок на шляху до кар'єрного зростання. Успіхів!`,

    html: `<img src="cid:uniqueAdaptiveCard@nodemailer.com" /><br />
    <h1>Привіт!</h1>
    <p>
      V7Pro - це кар'єрний помічник від Viseven, який допомогає в професійному
      розвитку. Для того, щоб почати роботу в боті необхідно:
    </p>
    <br />
    <p><b>1. Встановити бота за посиланням</b></p>
    <p>
      <b>2. Зареєструватись. </b>Адміністратор вже створив тобі обліковий запис,
      все що тобі потрібно, це вперше вказати електронну адресу та секретний
      пароль у боті в Microsoft Teams.
    </p>
    <br />
    <p>Email: <b>${authEmail}</b></p>
    <p>Пароль: <b>${authKeyword}</b></p>
    <p>Не передавайте свої дані іншим особам!</p>
    <br />
    <p>
      <b>3. Розпочати роботу. </b>Рекомендуємо спочтаку ознайомитись з
      інструкцією по використанню боту та подивитись промо-відео.
    </p>
    <p>Давай зробимо перший крок на шляху до кар'єрного зростання. Успіхів!</p>`,
    attachments: [
      {
        filename: "image.jpg",
        path: "./images/image.png",
        cid: "uniqueAdaptiveCard@nodemailer.com",
      },
      {
        path: link,
      },
    ],
  };
}

module.exports = createAuthEmail;
