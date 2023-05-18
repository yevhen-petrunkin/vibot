// const axios = require("axios");
// const querystring = require("querystring");

const {
  TeamsActivityHandler,
  // CardFactory,
  TurnContext,
} = require("botbuilder");

const fetchAllCompanyData = require("./db-functions/fetchAllCompanyData");

const { normalizeMessageText } = require("./helpers/normalize");
const handleMessageByText = require("./handlers/handleMessageByText");
const handleNoCredentials = require("./handlers/handleNoCredentials");
const handlePreRegisterActions = require("./handlers/handlePreRegisterActions");
const handleInvokeByVerb = require("./handlers/handleIvokeByVerb");
const handleAdminFunctions = require("./handlers/handleAdminFunctions");
const showAdaptiveCardByData = require("./actions/showAdaptiveCardByData");

const { rawAdminMenuCard } = require("./adaptiveCards/cardIndex");

class TeamsBot extends TeamsActivityHandler {
  constructor() {
    super();

    this.credentials = null;
    this.state = null;

    this.onMessage(async (context, next) => {
      if (!this.credentials) {
        this.credentials = await handleNoCredentials(context);
        console.log("Message Credentials: ", this.credentials);
        return;
      }

      const config = { context, credentials: this.credentials };

      let message = context.activity.text;
      const removedMentionText = TurnContext.removeRecipientMention(
        context.activity
      );
      message = normalizeMessageText(removedMentionText);

      fetchAllCompanyData(this.credentials.companyName);

      if (this.credentials.userRole === "admin") {
        ("Admin is still logged on message with credentials");
        await showAdaptiveCardByData(rawAdminMenuCard, context);
      }

      if (
        this.credentials.userRole === "manager" ||
        this.credentials.userRole === "specialist"
      ) {
        ("User (manager/specialist) is still logged on message with credentials");
        await handleMessageByText(message, config);
      }

      await next();
    });

    // this.onMembersAdded(async (context, next) => {
    //   await context.sendActivity("I run onMembersAdded");

    //   await next();
    // });
  }

  async onAdaptiveCardInvoke(context, invokeValue) {
    console.log("Invoke Credentials: ", this.credentials);
    const verb = invokeValue.action.verb;

    if (!this.credentials) {
      const { isTriggered, credentials } = await handlePreRegisterActions(
        verb,
        context,
        this.credentials
      );

      if (!isTriggered) {
        this.credentials = await handleNoCredentials(context);
        return { statusCode: 200 };
      }
      this.credentials = credentials;
      return { statusCode: 200 };
    }

    this.state = context.activity.value.action.data;

    const config = {
      context,
      credentials: this.credentials,
      state: this.state,
    };

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
      this.credentials.stage = verb;
      await handleInvokeByVerb(verb, config);
    }

    return { statusCode: 200 };
  }
}

// Message extension Code
// Action.
// handleTeamsMessagingExtensionSubmitAction(context, action) {
//   switch (action.commandId) {
//     case "createCard":
//       return createCardCommand(context, action);
//     case "shareMessage":
//       return shareMessageCommand(context, action);
//     default:
//       throw new Error("NotImplemented");
//   }
// }

// Search.
// async handleTeamsMessagingExtensionQuery(context, query) {
//   const searchQuery = query.parameters[0].value;
//   const response = await axios.get(
//     `http://registry.npmjs.com/-/v1/search?${querystring.stringify({
//       text: searchQuery,
//       size: 8,
//     })}`
//   );

//   const attachments = [];
//   response.data.objects.forEach((obj) => {
//     const heroCard = CardFactory.heroCard(obj.package.name);
//     const preview = CardFactory.heroCard(obj.package.name);
//     preview.content.tap = {
//       type: "invoke",
//       value: { name: obj.package.name, description: obj.package.description },
//     };
//     const attachment = { ...heroCard, preview };
//     attachments.push(attachment);
//   });

//   return {
//     composeExtension: {
//       type: "result",
//       attachmentLayout: "list",
//       attachments: attachments,
//     },
//   };
// }

// async handleTeamsMessagingExtensionSelectItem(context, obj) {
//   return {
//     composeExtension: {
//       type: "result",
//       attachmentLayout: "list",
//       attachments: [CardFactory.heroCard(obj.name, obj.description)],
//     },
//   };
// }

// Link Unfurling.
// handleTeamsAppBasedLinkQuery(context, query) {
//   const attachment = CardFactory.thumbnailCard("Thumbnail Card", query.url, [
//     query.url,
//   ]);

//   const result = {
//     attachmentLayout: "list",
//     type: "result",
//     attachments: [attachment],
//   };

//   const response = {
//     composeExtension: result,
//   };
//   return response;
// }

// function createCardCommand(context, action) {
//   // The user has chosen to create a card by choosing the 'Create Card' context menu command.
//   const data = action.data;
//   const heroCard = CardFactory.heroCard(data.title, data.text);
//   heroCard.content.subtitle = data.subTitle;
//   const attachment = {
//     contentType: heroCard.contentType,
//     content: heroCard.content,
//     preview: heroCard,
//   };

//   return {
//     composeExtension: {
//       type: "result",
//       attachmentLayout: "list",
//       attachments: [attachment],
//     },
//   };

// function shareMessageCommand(context, action) {
//   // The user has chosen to share a message by choosing the 'Share Message' context menu command.
//   let userName = "unknown";
//   if (
//     action.messagePayload &&
//     action.messagePayload.from &&
//     action.messagePayload.from.user &&
//     action.messagePayload.from.user.displayName
//   ) {
//     userName = action.messagePayload.from.user.displayName;
//   }

//   // This Message Extension example allows the user to check a box to include an image with the
//   // shared message.  This demonstrates sending custom parameters along with the message payload.
//   let images = [];
//   const includeImage = action.data.includeImage;
//   if (includeImage === "true") {
//     images = [
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtB3AwMUeNoq4gUBGe6Ocj8kyh3bXa9ZbV7u1fVKQoyKFHdkqU",
//     ];
//   }
//   const heroCard = CardFactory.heroCard(
//     `${userName} originally sent this message:`,
//     action.messagePayload.body.content,
//     images
//   );

//   if (
//     action.messagePayload &&
//     action.messagePayload.attachments &&
//     action.messagePayload.attachments.length > 0
//   ) {
//     // This sample does not add the MessagePayload Attachments.  This is left as an
//     // exercise for the user.
//     heroCard.content.subtitle = `(${action.messagePayload.attachments.length} Attachments not included)`;
//   }

//   const attachment = {
//     contentType: heroCard.contentType,
//     content: heroCard.content,
//     preview: heroCard,
//   };

//   return {
//     composeExtension: {
//       type: "result",
//       attachmentLayout: "list",
//       attachments: [attachment],
//     },
//   };
// }

module.exports.TeamsBot = TeamsBot;
