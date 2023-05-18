// const { authCode } = require("./server");

// const { Client } = require("@microsoft/microsoft-graph-client");

// const TENANT_ID = "e54ea06b-e5f6-435f-bc26-374f91e263e7";
// const CLIENT_ID = "32204052-ff61-4248-a366-ebe82079df68";
// const CLIENT_SECRET = "ONY8Q~IqGI-ZN3uWAmKFMd2Ivz-OSf41rr0n3aHH";

// const {
//   TokenCredentialAuthenticationProvider,
// } = require("@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials");
// const { AuthorizationCodeCredential } = require("@azure/identity");

// const credential = new AuthorizationCodeCredential(
//   TENANT_ID,
//   CLIENT_ID,
//   authCode,
//   "https://127.0.0.1:9239/auth-response"
// );
// const authProvider = new TokenCredentialAuthenticationProvider(credential, {
//   scopes: ["https://graph.microsoft.com/User.Read"],
// });

// const client = Client.initWithMiddleware({
//   debugLogging: true,
//   authProvider,
// });

// module.exports = { client };
