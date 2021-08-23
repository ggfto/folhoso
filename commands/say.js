const permissions = [
    { name: "Administrador", value: "ADMINISTRATOR"}
];
module.exports = {
    name: 'say',
    description: 'Utiliza o bot para enviar mensagens.',
    permissions: permissions,
    example: '`say geral Olá` -> Envia Olá no canal de texto geral.',
    async execute(message, args) {
        message.delete();
        if(hasPermission(message)){
            if(!args[0]) return message.reply("Por favor informe canal e mensagem!");
            let channel = message.member.guild.channels.cache.find(ch => ch.name == args[0]);
            if(channel == undefined) channel = message.member.guild.channels.cache.find(ch => ch.id == args[0]);
            let text = undefined;
            if(channel == undefined) {
                channel = message.channel;
                text = args.join(' ');
            } else
                text = args.join(' ').substring(args[0].length + 1);
            channel.send(text).catch(console.error);
        }
    }
}

function hasPermission(message) {
    let result = false;
    for(p of permissions) {
        result = message.member.hasPermission(p.value);
        if(result) break;
        result = message.channel.permissionsFor(message.member).has(p.value);
        if(result) break;
    }
    return result;
}