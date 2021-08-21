const Discord = require('discord.js');
const fs = require('fs');
module.exports = {
    name: 'help',
    description: 'Menu de ajuda',
    example: '```help``` -> Mostra esse menu.',
    execute(message, args) {
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle('Ajuda')
            .setAuthor('G Five#0272', '', 'https://github.com/ggfto')
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
        field.name = cmd.name;
        field.value = `${cmd.description}\n${cmd.example}`;
        fields.push(field);
    }
    return fields;
}