const Discord = require("discord.js");
const fs = require('fs');
const config = require("./config.json");

const client = new Discord.Client();
const prefix = "!";
client.commands = new Discord.Collection();
client.greetings = new Discord.Collection();

function getFiles(dir, ext) {
    try {
        return fs.readdirSync(`./${dir}/`).filter(file => file.endsWith(`.${ext}`));
    } catch(error) {
        console.error(error);
    }
}

function populateCollection(collection, dir) {
    for(const file of getFiles(dir, 'js')) {
        const obj = require(`./${dir}/${file}`);
        collection.set(obj.name, obj);
    }    
}

client.on("ready", () => {
    populateCollection(client.commands, 'commands');
    populateCollection(client.greetings, 'greetings');
    console.log("Folhoso is on!");
});

client.on("message", async message => {
    if (message.author.bot || message.channel.type =="dm") return;                                   
    if (!message.content.startsWith(prefix)) {
        strMsg = message.content.trim().toUpperCase();
        if(strMsg.startsWith("BOM DIA")) {
            client.greetings.get('bomdia').execute(message, []);
        } else if(strMsg.includes("SAINDO") || strMsg.includes("PARTIU") || strMsg.includes("ATÉ AMANHÃ") || strMsg.includes("ATÉ AMANHA") || strMsg.includes("ATE AMANHA") || strMsg.includes("ATE AMANHÃ")) {
            client.greetings.get('saindo').execute(message, []);
        } else if(strMsg.includes('VOLTEI')) {
            client.greetings.get('retorno').execute(message, []);
        }
    } else {
        const args = message.content.slice(prefix.length).split(' ');
        const command = args.shift().toLowerCase();
        if(command === 'help') client.commands.get(command).execute(message, client.commands);
        else client.commands.get(command).execute(message, args);
    }
});

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

client.login(config.BOT_TOKEN);