const Discord = require("discord.js");

const config = require("./config.json");
const client = new Discord.Client();
const prefix = "!";
const replyBank = [];

client.on("ready", () => {
    replyBank.push("Bom dia pra quem?");
    replyBank.push("Bom dia princesa!");
    replyBank.push("Bom dia? Só se for pra você!");
    replyBank.push("Bom dia? Tá mais pra boa tarde!");
    replyBank.push("Finalmente ein?");
});

client.on("message", async message => {
    if (message.author.bot || message.channel.type =="dm") return;                                   
    if (!message.content.startsWith(prefix)) {
        if(message.content.trim().toUpperCase().startsWith("BOM DIA")) {
            message.reply(getRandomReply());
        }
    }
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    switch(command) {
        case "ping":
            const timeTaken = Date.now() - message.createdTimestamp;
            message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
        break;
        case "sayfix":
            message.channel.send("```" + message.content.substring(command.length+2) + "```")
                .catch(console.error);
        break;
        case "say":
            message.channel.send(message.content.substring(command.length+2))
                .catch(console.error);
        break;
    }
});

function getRandomReply() {
    return replyBank[getRandomInt(0,5)];
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

client.on("guildMemberAdd", async member => {
    const channel = member.guild.channels.cache.find(ch => ch.id == config.welcome_channel_id);
    const devutils = member.guild.channels.cache.find(ch => ch.id == config.devutils_channel_id);
    const softutils = member.guild.channels.cache.find(ch => ch.id == config.softutils_channel_id);
    if(!channel) {
        console.log('404');
        return;
    }
    let servidor = client.guilds.resolve(config.server_id);
    let membro = servidor.members.resolve(member.id);
    membro.roles.add(config.visitor_role_id);
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
        //fields:[{}],
        timestamp: new Date(),
        footer: {
            text: "Time Disruptivo"
        }
      }});
})

client.login(config.BOT_TOKEN);