module.exports = (Discord, client, message) => {
    const prefix = "!";
    if (message.author.bot || message.channel.type =="dm") return;
    if (!message.content.startsWith(prefix)) {
        strMsg = message.content.trim().toUpperCase();
        if(strMsg.startsWith("BOM DIA")) {
            client.greetings.get('bomdia').execute(client, message, [], Discord);
        } else if(strMsg.includes("SAINDO") || strMsg.includes("PARTIU") || strMsg.includes("ATÉ AMANHÃ") || strMsg.includes("ATÉ AMANHA") || strMsg.includes("ATE AMANHA") || strMsg.includes("ATE AMANHÃ")) {
            client.greetings.get('saindo').execute(client, message, [], Discord);
        } else if(strMsg.includes('VOLTEI')) {
            client.greetings.get('retorno').execute(client, message, [], Discord);
        } else if(strMsg.includes("DEVOPS")) {
            message.channel.send("https://tenor.com/view/cone-swimming-drunk-dance-gif-15857244");
        }
    } else {
        const args = message.content.slice(prefix.length).split(' ');
        const cmd = args.shift().toLowerCase();
        const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
        if(command) command.execute(client, message, args, Discord, cmd);
    }
}