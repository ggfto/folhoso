const Configuration = require("../config/configuration");
const cfg = require("../config/config");
const Command = require("../config/command");

const permissions = [{
    name: "Administrador",
    value: "ADMINISTRATOR"
}];
module.exports = {
    name: 'set',
    description: 'Setar configuracoes.',
    permissions: permissions,
    example: '`set welcome_channel_id geral` -> Configura o canal de texto geral para receber mensagens de boas vindas.',
    async execute(client, message, args, Discord) {
        if (cfg.hasPermission(message, permissions)) {
            if (!args[0] || !args[1]) return message.reply("Por favor informe chave e valor!");
            if (args[0].includes("channel")) {
                let config = await Configuration.findByPk(message.member.guild.id);
                if (!config) {
                    config = await Configuration.create({
                        server: message.member.guild.id
                    });
                }
                let channel = message.member.guild.channels.cache.find(ch => ch.name == args[1]);
                if (!channel) channel = message.member.guild.channels.cache.find(ch => ch.id == args[1]);
                if (!channel) channel = message.member.guild.channels.cache.find(ch => ch.id == args[1].replace("<", "").replace("#", "").replace(">", ""));
                if (!channel) return message.reply("Não encontrei o canal!");
                config[args[0]] = channel.id;
                await config.save().then(() => {
                    message.reply(`${args[0]} configurado para ${args[1]}`);
                }).catch(console.error);
            } else if (args[0]) {
                const command = client.commands.get(args[0]);
                const greeting = client.greetings.get(args[0]);
                if (command || greeting) {
                    let type;
                    let name;
                    if (command) {
                        type = 'command';
                        name = command.name;
                    } else if (greeting) {
                        type = 'greeting';
                        name = greeting.name;
                    } else return;
                    let server = message.guild.id;
                    let config = await Command.findOne({
                        where: {
                            server: server,
                            type: type,
                            name: name
                        }
                    });
                    if (!config) {
                        config = await Command.create({
                            server: server,
                            type: type,
                            name: name,
                        });
                    }
                    let value = JSON.parse(config.value);
                    if (value == undefined || value == null) value = {};
                    value[args[1]] = args[2];
                    config.value = JSON.stringify(value);
                    await config.save().then((result) => {
                        message.reply(`${args[0]} configurado para ${result[args[0]]}`);
                    }).catch(console.error);
                } else {
                    message.reply(`${args[0]} não encontrado.`);
                }
            }
        }
    }
}