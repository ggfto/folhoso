const Command = require("../config/command");
const cfg = require("../config/config");

const permissions = [{
    name: "Administrador",
    value: "ADMINISTRATOR"
}];

const definition = {
    name: 'greet',
    type: 'command',
    description: 'Configurar cumprimentos.',
    permissions: permissions,
    example: '`greet bomdia active true` -> Configura o bot para enviar mensagens de bom dia aleatórias.'
}

module.exports = {
    name: definition.name,
    description: definition.description,
    permissions: definition.permissions,
    example: definition.example,
    async execute(client, message, args, Discord) {
        if (cfg.hasPermission(message, permissions)) {
            if (!args[0] || !args[1]) return message.reply("Por favor informe chave e valores!");
            if (args[0]) {
                let greeting = await Command.findOne({
                    where: {
                        server: message.member.guild.id,
                        type: 'greeting',
                        name: args[0]
                    }
                });
                if (!greeting) {
                    greeting = await Command.create({
                        server: message.member.guild.id,
                        type: 'greeting',
                        name: args[0],
                        value: JSON.stringify(JSON.parse(`{
                            "${args[1]}": ${args[2]}
                        }`))
                    });
                }
                greeting.value = JSON.stringify(mergeJson(JSON.parse(greeting.value), JSON.parse(`{"${args[1]}": ${args[2]}}`)));
                await greeting.save().then((result) => {
                    message.reply(`${args[0]} configurado!`);
                }).catch(console.error);
            }
        }
    }
}

function mergeJson(obj1, obj2) {
    return {
        ...obj1,
        ...obj2
    };
}