const createAdaptiveCardFromObject = require("./helpers/createAdaptiveCardFromObject");
const {
  rawNavigateCard,
  adaptiveCards,
  rawSupportCard,
  rawAdminMenuCard,
} = require("./adaptiveCards/cardIndex");

const {
  TeamsActivityHandler,

  TurnContext,
} = require("botbuilder");

const fetchAllCompanyData = require("./db-functions/fetchAllCompanyData");

const handleMessageByText = require("./handlers/handleMessageByText");
const handleNoCredentials = require("./handlers/handleNoCredentials");
const handlePreRegisterActions = require("./handlers/handlePreRegisterActions");
const handleInvokeByVerb = require("./handlers/handleIvokeByVerb");
const handleAdminFunctions = require("./handlers/handleAdminFunctions");

const handleNextReminder = require("./handlers/handleNextReminder");
const handleReminders = require("./handlers/handleReminders");
const showAdaptiveCardByData = require("./actions/showAdaptiveCardByData");
const sendEmail = require("./actions/sendEmail");
const createSupportEmail = require("./helpers/emailCreators/createSupportEmail");
const findAdaptiveCard = require("./helpers/findAdaptiveCard");
const { normalizeMessageText } = require("./helpers/normalize");
const checkIsReminder = require("./helpers/checkIsReminder");
const defineNextVerb = require("./helpers/defineNextVerb");
const changeDataInAdaptiveCard = require("./helpers/changeDataInAdaptiveCard");

class TeamsBot extends TeamsActivityHandler {
  constructor() {
    super();

    this.credentials = null;
    this.state = {};
    this.reminders = [];
    this.reminderIndex = 0;

    this.onMessage(async (context, next) => {
      console.log("On Message");
      let message = context.activity.text;
      const removedMentionText = TurnContext.removeRecipientMention(
        context.activity
      );
      message = normalizeMessageText(removedMentionText);

      if (message.toLowerCase() === "help") {
        const supportCard = createAdaptiveCardFromObject(rawSupportCard);
        await context.sendActivity({
          attachments: [supportCard],
        });
        return;
      }

      if (!this.credentials) {
        this.credentials = await handleNoCredentials(context);
        console.log("Message Credentials: ", this.credentials);
        return;
      }

      const config = {
        context,
        credentials: this.credentials,
        state: this.state,
        reminders: this.reminders,
        reminderIndex: this.reminderIndex,
      };

      if (this.credentials.userRole === "admin") {
        console.log("Admin is still logged on message with credentials");
        const adaptiveCardData = await changeDataInAdaptiveCard(
          rawAdminMenuCard,
          config
        );
        await showAdaptiveCardByData(adaptiveCardData, context);
      }

      if (
        this.credentials.userRole === "manager" ||
        this.credentials.userRole === "specialist"
      ) {
        console.log(
          "User (manager/specialist) is still logged on message with credentials"
        );
        await handleMessageByText(message, config);
      }

      await next();
    });
  }

  async onAdaptiveCardInvoke(context, invokeValue) {
    console.log("Invoke Credentials: ", this.credentials);
    const verb = invokeValue.action.verb;

    if (verb.toLowerCase() === "sendToSupport".toLowerCase()) {
      const userName = context.activity.from.name;
      const formData = context.activity.value.action.data;
      const data = {
        userName,
        userEmail: formData.userEmail,
        userMessage: formData.userMessage,
      };
      await sendEmail(createSupportEmail, data);
      await context.sendActivity(
        "Лист у технічну підтримку надіслано. Чекайте на відповідь."
      );

      return { statusCode: 200 };
    }

    if (!this.credentials) {
      const { isTriggered, credentials, reminders } =
        await handlePreRegisterActions(verb, context, this.credentials);

      if (!isTriggered) {
        this.credentials = await handleNoCredentials(context);
        return { statusCode: 200 };
      }
      this.credentials = credentials;
      this.reminders = reminders;
      return { statusCode: 200 };
    }

    if (context.activity.value.action.data) {
      this.state = context.activity.value.action.data;
    }

    const config = {
      context,
      credentials: this.credentials,
      state: this.state,
      reminders: this.reminders,
      reminderIndex: this.reminderIndex,
    };

    if (verb.toLowerCase() === "nextReminder".toLowerCase()) {
      this.reminderIndex += 1;
      const config = {
        context,
        credentials: this.credentials,
        reminders: this.reminders,
        reminderIndex: this.reminderIndex,
      };
      await handleNextReminder(config);
      return { statusCode: 200 };
    }

    if (checkIsReminder(verb)) {
      this.reminders = await handleReminders(verb, config);
      return { statusCode: 200 };
    }

    if (this.credentials.userRole === "admin") {
      console.log("Admin is still logged on invoke with credentials");
      await handleAdminFunctions(verb, config);
    }

    if (
      this.credentials.userRole === "manager" ||
      this.credentials.userRole === "specialist"
    ) {
      console.log(
        "User (manager/specialist) is still logged on invoke with credentials"
      );

      this.credentials.stage = defineNextVerb(verb, this.credentials);

      console.log("New Stage:", this.credentials.stage);
      await handleInvokeByVerb(verb, config);
    }

    return { statusCode: 200 };
  }
}

module.exports.TeamsBot = TeamsBot;
