const Discord = require("discord.js");
const fs = require('fs');
const config = require("./config.json");

const client = new Discord.Client();

client.commands = new Discord.Collection();
client.greetings = new Discord.Collection();

['command_handler','greeting_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

client.on("guildMemberAdd", async member => {
    const channel = member.guild.channels.cache.find(ch => ch.id == config.welcome_channel_id);
    const devutils = member.guild.channels.cache.find(ch => ch.id == config.devutils_channel_id);
    const softutils = member.guild.channels.cache.find(ch => ch.id == config.softutils_channel_id);
    if(!channel || !devutils || !softutils) {
        console.log('404');
        return;
    }
    channel.send({embed: {
        color: 0x00ff00,
        description: `Seja bem-vindo ao time, ${member}!!!`,
        fields: [{
            name: "Utils",
            value: `Dê uma olhada em <#${devutils.id}> e <#${softutils.id}>, pode ter algo pra ajudar em sua jornada por aqui.`
        }],
        timestamp: new Date(),
        footer: {
            text: "Time Disruptivo"
        }
    }});
});

client.on("guildMemberRemove", async member => {
    const channel = member.guild.channels.cache.find(ch => ch.id == config.goodbye_channel_id);
    if(!channel) console.log('404');
    channel.send({embed: {
        color: 0xff0000,
        description: `${member} deixou o time.`,
        timestamp: new Date(),
        footer: {
            text: "Time Disruptivo"
        }
      }});
})

client.login(process.env.BOT_TOKEN);