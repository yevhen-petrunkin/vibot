const activity = {
  name: "adaptiveCard/action",
  type: "invoke",
  timestamp: Date("2023-05-18T11:33:58.858Z"),
  localTimestamp: Date("2023-05-18T11:33:58.858Z"),
  id: "f:97c59f4c-07c2-1e7c-eaa6-297ae18f7368",
  channelId: "msteams",
  serviceUrl: "https://smba.trafficmanager.net/emea/",
  from: {
    id: "29:1GF0h-uiqRnKqZLo9YD28Z78_BRMqUk2LxeeLRzP8PSXX--9ldFjvg_RFBd8PD14yrI4WyKf_CuqQD-OB1P5LsA",
    name: "Yevhen Petrunkin",
    aadObjectId: "ee28d880-225a-4619-8c8e-6b37c52bdcd0",
  },
  conversation: {
    conversationType: "personal",
    tenantId: "80cc296b-2603-42be-b35e-ed30aeeac086",
    id: "a:1pI8ovVKrc7BPPW_chHdm_0nNahyJ5bUqUv88xZ4ezn6iRVI0vFH0eBxXR0I3KNJdUKS2aALMSadbgVdcLzwNMKwJ9Q6QVE0YrvP4NEig8LwoTvML28onduTM0OGoycyB",
  },
  recipient: {
    id: "28:94758b15-bc91-40ed-84bc-c67ddc7304c6",
    name: "V7Pro-bot",
  },
  entities: [
    {
      locale: "ru-RU",
      country: "RU",
      platform: "Web",
      timezone: "Europe/Kiev",
      type: "clientInfo",
    },
  ],
  channelData: {
    tenant: { id: "80cc296b-2603-42be-b35e-ed30aeeac086" },
    source: { name: "message" },
    legacy: { replyToId: "1:12Du2N9t5pxbkAt63tOt6eIY-dSJt_eQng7U-h1c-FIE" },
  },
  replyToId: "1684409469696",
  value: {
    action: {
      type: "Action.Execute",
      title: "Увійти",
      verb: "logIn",
      data: {},
    },
    trigger: "manual",
  },
  locale: "ru-RU",
  localTimezone: "Europe/Kiev",
  rawTimestamp: "2023-05-18T11:33:58.858Z",
  rawLocalTimestamp: "2023-05-18T14:33:58.858+03:00",
  callerId: "urn:botframework:azure",
};

module.exports = { activity };
