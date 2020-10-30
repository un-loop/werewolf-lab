const dbContext = require("../dbcontext");
const Table = require("unloop-database-dynamo")(dbContext.db, dbContext.docClient);

const key = "name";
exports.key = key;

exports.schema = {
    TableName : "Cats",
    BillingMode: "PROVISIONED",
    KeySchema: [
        { AttributeName: key, KeyType: "HASH"}
    ],
    AttributeDefinitions: [
            { AttributeName: key, AttributeType: "S" }
        ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};

exports.initialData = [
    {
        name: "Jasper",
        owner: "Kitty Kally",
        age: 1
    },
    {
        name: "Daisy",
        owner: "Katherine Mao",
        age: 8
    }
];

exports.table = new Table(this);
