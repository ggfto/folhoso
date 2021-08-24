module.exports = {
    name: 'leave',
    description: 'Sair do canal de áudio',
    example: '`leave` -> Sai do canal áudio.',
    async execute(client, message, args, Discord) {
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send("Você precisa estar em um canal de áudio para utilizar este comando!");
        await voiceChannel.leave();
        await message.reply(`:x: Desconectado.`);
    }
}