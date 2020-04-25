
// this script works with the Pauldron Hearth deployed at:
// http://localhost:8080 and 
// the Pauldron server deployed at:
// http://localhost:3000
const jwt = require("jsonwebtoken");
const PauldronClient = require("pauldron-clients");


const POLICY_API_TOKEN = {
    uid: "test_user",
    realm: "example",
    scopes: ["POL:C", "POL:L", "POL:R", "POL:D"]
};

const AUTH_API_TOKEN = {
    uid: "test_user",
    realm: "example",
    scopes: ["AUTH:C"]
};

const PROTECTION_API_TOKEN = {
    uid: "test_user",
    realm: "example",
    scopes: ["INTR:R", "PERMS:C", "PERMS:R", "PERMS:L"]
};

const TEST_POLICY_API_KEY = jwt.sign(POLICY_API_TOKEN, "secret");
const TEST_PROTECTION_API_KEY = jwt.sign(PROTECTION_API_TOKEN, "secret");
const TEST_AUTH_API_KEY = jwt.sign(AUTH_API_TOKEN, "secret");

const POLICY = require("./tests/fixtures/simple-policy.json");

const CLAIMS = {
    client_id: "client4",
    organization: "org1",
    iss: "sampleIssuer1",
    pous: [
        {
            system: "http://hl7.org/fhir/v3/ActReason",
            code: "TREAT"
        }
    ]
};

const CLAIMS_TOKEN = jwt.sign(CLAIMS, "secret1");

const scopes = [
    {
        resource_set_id: {
            patientId:{
                system: "http://hl7.org/fhir/sid/us-ssn", 
                value: "444222222"
            },
            resourceType: "Specimen",
            securityLabel: [
                {
                    system: "http://terminology.hl7.org/CodeSystem/v3-Confidentiality",
                    code: "N"
                }
            ]
        },
        scopes: ["read"]
    }
];

async function testWithHttpClientWrapper() { 
    const uri = process.argv[2];
    if (!uri) {
        console.error("Must provide a URL.");
        return;
    }

    await PauldronClient.Policy.add(
        POLICY, 
        "http://localhost:3000/policies", 
        TEST_POLICY_API_KEY
    );

    const options = {
        requestedScopes: scopes,
        claimsToken: CLAIMS_TOKEN,
        authEndpointUrl: "http://localhost:3000/oauth2/authorization",
        authApiKey: TEST_AUTH_API_KEY,
        method: "GET",
        json: true,
        uri: uri
    };
    console.log(`${options.method} ${options.uri}`);
    const {token, response} = await PauldronClient.HTTP.OAuth2.request(options);

    console.log(`token: ${token}`);
    console.log(`response: ${JSON.stringify(response)}`);
}


testWithHttpClientWrapper()
.then((res) => {})
.catch((e) => {
    console.log(e.message);
});
