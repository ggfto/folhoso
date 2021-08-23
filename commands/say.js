const permissions = [
    { name: "Administrador", value: "ADMINISTRATOR"}
];
module.exports = {
    name: 'say',
    description: 'Utiliza o bot para enviar mensagens.',
    permissions: permissions,
    example: '`say geral Olá` -> Envia Olá no canal de texto geral.',
    async execute(message, args) {
        if(hasPermission(message)){
            if(!args[0]) return message.reply("Por favor informe canal e mensagem!");
            let channel = message.member.guild.channels.cache.find(ch => ch.name == args[0]);
            if(channel == undefined) channel = message.member.guild.channels.cache.find(ch => ch.id == args[0]);
            if(channel == undefined) return message.reply("Canal inválido!");
            channel.send(args[1]).catch(console.error);
            message.delete();
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