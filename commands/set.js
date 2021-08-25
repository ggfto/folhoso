const Configuration = require("../config/configuration");

const permissions = [
    { name: "Administrador", value: "ADMINISTRATOR"}
];
module.exports = {
    name: 'set',
    description: 'Setar configuracoes.',
    permissions: permissions,
    example: '`set welcome_channel_id geral -> Configura o canal de texto geral para receber mensagens de boas vindas.',
    async execute(client, message, args, Discord) {
        if(hasPermission(message)){
            if(!args[0] || !args[1]) return message.reply("Por favor informe chave e valor!");
            if(args[0].includes("channel")) {
                let config = await Configuration.findByPk(message.member.guild.id);
                if(!config) {
                    config = await Configuration.create({
                        server: message.member.guild.id
                    });
                }
                let channel = message.member.guild.channels.cache.find(ch => ch.name == args[1]);
                if(!channel) channel = message.member.guild.channels.cache.find(ch => ch.id == args[1]);
                if(!channel) channel = message.member.guild.channels.cache.find(ch => ch.id == args[1].replace("<","").replace("#","").replace(">",""));
                if(!channel) return message.reply("Não encontrei o canal!");
                config[args[0]] = channel.id;
                await config.save().then(() => {
                    message.reply(`${args[0]} configurado para ${args[1]}`);
                }).catch(console.error);
            } else if(args[0]) {
                let config = await Configuration.findByPk(message.member.guild.id);
                if(!config) {
                    config = await Configuration.create({
                        server: message.member.guild.id
                    });
                }
                config[args[0]] = args.join(' ').substring(args[0].length + 1);
                await config.save().then((result) => {
                    message.reply(`${args[0]} configurado para ${result[args[0]]}`);
                }).catch(console.error);
            }
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