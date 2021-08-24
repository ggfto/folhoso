const handler_helper = require('./handler_helper');
module.exports = (client, Discord) => {
    handler_helper.populateCollection(client.greetings, 'greetings');
}