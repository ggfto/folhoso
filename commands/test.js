const Configuration = require("../config/configuration");

module.exports = {
    name: 'test',
    description: 'Teste',
    example: '`test` -> Executa um teste.',
    async execute(client, message, args, Discord) {
        let config = await Configuration.findByPk(message.guild.id).catch(console.error);
        if(config.goodbye_message) message.channel.send(JSON.parse(config.goodbye_message.replace("_membro_", message.author).replace("_servidor_", message.guild.name).replace("_data_", new Date())));
        if(config.greeting_message) message.channel.send(JSON.parse(config.greeting_message.replace("_membro_", message.author).replace("_servidor_", message.guild.name).replace("_data_", new Date())));
    }
}