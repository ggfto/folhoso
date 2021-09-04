const Discord = require('discord.js');
const fs = require('fs');
module.exports = {
    name: 'help',
    description: 'Menu de ajuda',
    example: '`help` -> Mostra esse menu.',
    execute(client, message, args, Discord) {
        if(!args[0]) {
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#00ffff')
                .setTitle('Ajuda')
                .setAuthor('Dev: G Five#0272', '', 'https://github.com/ggfto')
                .setDescription("Olá, eu sou o Folhoso, o BOT da Folha e estou aqui para ajudar (ou não).\n Estes são os comandos atualmente disponíveis para você utilizar:\n"
                    + getCommandNames(client.commands) + "\n\nPara mais informações sobre um comando digite `!help comando`")
                .setTimestamp()
                .setFooter('Folhoso', '');
            message.channel.send(exampleEmbed);
        } else {
            message.channel.send(getCommand(client.commands, args[0]));
        }
    }
}

function getCommandNames(commands) {
    let names = "";
    for(command of commands) {
        if(command[1].name)
            names += "`" + command[1].name + "`,";
    }
    return names.slice(0, -1);
}

function getCommand(commands, name) {
    let cmd = null;
    for(command of commands) {
        if(command[1].name == name) {
            cmd = command[1];
            break;
        }
    }
    if(cmd) {
        return new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle(cmd.name)
            .setDescription(`Descrição: ${cmd.description}`)
            .addFields([
                {
                    name: "Permissão requerida",
                    value: getPermissions(cmd)
                },
                {
                    name: "Exemplo",
                    value: cmd.example
                }
            ])
            .setTimestamp()
            .setFooter('Folhoso', '');
    } else {
        return `comando '${name}' não encontrado!`;
    }
}

function getPermissions(command) {
    let result = "";
    if(command.permissions == undefined) return result += "`Nenhuma`";
    for(p of command.permissions) {
        result += "`" + p.name + "`,";
    }
    return result.slice(0,-1);
}