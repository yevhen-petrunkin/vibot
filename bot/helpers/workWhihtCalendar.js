const { Client } = require("@microsoft/microsoft-graph-client");
const { teamsGetChannelId } = require("@microsoft/teams-js");

// Получение ID канала, в котором находится бот
teamsGetChannelId(function (channelId) {
  // Создание экземпляра клиента Graph API
  const client = Client.init({
    authProvider: (done) => {
      // Получение токена доступа бота
      done(null, process.env.BOT_ACCESS_TOKEN);
    },
  });

  // Получение списка событий из календаря Teams
  client.api(`/teams/${channelId}/events`).get((err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res.value);
    }
  });
});
