module.exports = {
    name: 'ping',
    description: 'Retorna a latência até o bot.',
    example: '`ping` -> Retorna a latência da mensagem.',
    execute(client, message, args, Discord) {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! Latência da mensagem: ${timeTaken}ms.`);
    }
}