function UMA_MODE() {
    return (process.env.UMA_MODE !== "false");
}

const UMA_SERVER_BASE = process.env.UMA_SERVER_BASE;
const UMA_SERVER_REALM = process.env.UMA_SERVER_REALM;
const UMA_SERVER_AUTHORIZATION_ENDPOINT = process.env.UMA_SERVER_AUTHORIZATION_ENDPOINT;

const UMA_SERVER_INTROSPECTION_ENDPOINT = process.env.UMA_SERVER_INTROSPECTION_ENDPOINT;
const UMA_SERVER_PERMISSION_REGISTRATION_ENDPOINT = process.env.UMA_SERVER_PERMISSION_REGISTRATION_ENDPOINT;
const UMA_SERVER_PROTECTION_API_KEY = process.env.UMA_SERVER_PROTECTION_API_KEY;

module.exports = {
    UMA_MODE,
    UMA_SERVER_BASE,
    UMA_SERVER_REALM,
    UMA_SERVER_AUTHORIZATION_ENDPOINT,
    UMA_SERVER_INTROSPECTION_ENDPOINT,
    UMA_SERVER_PERMISSION_REGISTRATION_ENDPOINT,
    UMA_SERVER_PROTECTION_API_KEY
}
