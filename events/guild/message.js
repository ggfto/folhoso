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
        }
    } else {
        const args = message.content.slice(prefix.length).split(' ');
        const command = args.shift().toLowerCase();
        client.commands.get(command).execute(client, message, args, Discord);
    }
}