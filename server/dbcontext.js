const AWS= require("aws-sdk");

const config = {
    maxRetries: 1,
    httpOptions: { timeout: 30000, connectTimeout: 15000 }
};

class DbContext {
    constructor(
        endpoint = process.env.npm_package_config_dynamoEndpoint,
        region = process.env.npm_package_config_dynamoRegion
    ) {
        let options = { endpoint: endpoint || "" };
        if (region) {
            options["region"] = region;
        }

        AWS.config.update(options, true);
        this.db = new AWS.DynamoDB(config);
        this.docClient = new AWS.DynamoDB.DocumentClient(config);
    }
}

module.exports = new DbContext("http://localhost:8000", "us-west-2");

module.exports.DbContext = DbContext;
