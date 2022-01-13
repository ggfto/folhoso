const config = require('../config/config');
const Configuration = require("../config/configuration");

const permissions = [{
    name: "Administrador",
    value: "ADMINISTRATOR"
}];
module.exports = {
    name: 'get',
    description: 'Ler configuracoes.',
    permissions: permissions,
    example: '`get welcome_channel_id` -> Retorna o canal de texto para receber mensagens de boas vindas.',
    async execute(client, message, args, Discord) {
        if (config.hasPermission(message)) {
            if (!args[0] || !args[1]) return message.reply("Por favor informe chave e valor!");
            let config = await Configuration.findByPk(message.member.guild.id);
            if (!config || config[args[0]] == undefined)
                message.reply(`${args[0]} não configurado.`)
            else
                message.reply(`${args[0]} configurado para ${config[args[0]]}`).catch(console.error);
        }
    }
}