module.exports = (Discord, client, message) => {
    const prefix = "!";
    if (message.channel.type == "dm") return;
    if (!message.content.startsWith(prefix)) {
        strMsg = limpar(message.content.trim().toUpperCase());
        if (strMsg.startsWith("BOM DIA")) {
            client.greetings.get('bomdia').execute(client, message, [], Discord);
        } else if (strMsg.includes("SAINDO") ||
            strMsg.includes("PARTIU") ||
            strMsg.includes("ATE AMANHA")) {
            client.greetings.get('saindo').execute(client, message, [], Discord);
        } else if (strMsg.includes('VOLTEI')) {
            client.greetings.get('retorno').execute(client, message, [], Discord);
        } else if (strMsg.includes("DEVOPS")) {
            message.channel.send("https://tenor.com/view/cone-swimming-drunk-dance-gif-15857244");
        }
    } else {
        const args = message.content.slice(prefix.length).split(' ');
        const cmd = args.shift().toLowerCase();
        const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
        if (message.author.bot && message.author.name === client.user.username) return;
        if (message.author.bot && command && command.name != 'clear') return;
        if (command) command.execute(client, message, args, Discord, cmd);
    }
}

function limpar(str) {
    const com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
    const sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
    novastr = "";
    for (i = 0; i < str.length; i++) {
        troca = false;
        for (a = 0; a < com_acento.length; a++) {
            if (str.substr(i, 1) == com_acento.substr(a, 1)) {
                novastr += sem_acento.substr(a, 1);
                troca = true;
                break;
            }
        }
        if (troca == false) {
            novastr += str.substr(i, 1);
        }
    }
    return novastr;
}