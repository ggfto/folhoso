const config = require('../config/config');

const permissions = [{
    name: "Administrador",
    value: "ADMINISTRATOR"
}];

module.exports = {
    name: 'say',
    description: 'Utiliza o bot para enviar mensagens.',
    permissions: permissions,
    example: '`say geral Olá` -> Envia Olá no canal de texto geral.',
    async execute(client, message, args, Discord) {
        message.delete();
        if (config.hasPermission(message)) {
            if (!args[0]) return message.reply("Por favor informe canal e mensagem!");
            let channel = message.member.guild.channels.cache.find(ch => ch.name == args[0]);
            if (channel == undefined) channel = message.member.guild.channels.cache.find(ch => ch.id == args[0]);
            let text = undefined;
            if (channel == undefined) {
                channel = message.channel;
                text = args.join(' ');
            } else
                text = args.join(' ').substring(args[0].length + 1);
            channel.send(text).catch(console.error);
        }
    }
}