const Discord = require('discord.js');
const fs = require('fs');
module.exports = {
    name: 'help',
    description: 'Menu de ajuda',
    example: '`help` -> Mostra esse menu.',
    execute(message, args) {
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle('Ajuda')
            .setAuthor('Dev: G Five#0272', '', 'https://github.com/ggfto')
            .setDescription('Olá, eu sou o Folhoso, o BOT da Folha e estou aqui para ajudar.\n Estes são os comandos atualmente disponíveis para você utilizar:')
            .addFields(getCommands(args))
            .setTimestamp()
            .setFooter('Folhoso', '');
        message.channel.send(exampleEmbed);
    }
}

function getCommands(commands) {
    fields = [];
    for(command of commands) {
        field = {};
        cmd = command[1];
        if(cmd.name) {
            field.name = cmd.name;
            field.value = `${cmd.description}${getPermissions(cmd)}\nExemplo: ${cmd.example}`;
            fields.push(field);
        }
    }
    return fields;
}

function getPermissions(command) {
    let result = "\nPermissão requerida: ";
    if(command.permissions == undefined) return result += "Nenhuma";
    for(p of command.permissions) {
        result += "`" + p.name + "`,";
    }
    return result.slice(0,-1);
}