const config = require('../config/config');
const maxLimit = 100;
const permissions = [{
        name: "Administrador",
        value: "ADMINISTRATOR"
    },
    {
        name: "Gerenciar Mensagens",
        value: "MANAGE_MESSAGES"
    }
];

module.exports = {
    name: 'clear',
    description: 'Apaga a quantidade de mensagens enviadas a menos de 14 dias, passada como parâmetro.',
    permissions: permissions,
    example: '`clear 10` -> Apaga as últimas 10 mensagens enviadas no canal.',
    async execute(client, message, args, Discord) {
        if (config.hasPermission(message, permissions) || message.author.bot) {
            if (!args[0]) return message.reply("Por favor coloque a quantidade de mensagens a serem apagadas!");
            if (isNaN(args[0])) return message.reply("Por favor coloque um número válido!");
            if (args[0] > maxLimit) return message.reply(`Você não pode apagar mais que ${maxLimit} mensagens por comando!`);
            if (args[0] < 1) return message.reply("Você precisa apagar pelo menos uma mensagem!");
            await message.channel.messages.fetch({
                limit: args[0]
            }).then(messages => {
                message.channel.bulkDelete(messages);
            }).catch(error => {
                message.reply(error);
            });
        }
    }
}