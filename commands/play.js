const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
    name: 'play',
    description: 'Tocar músicas do youtube',
    example: '`play Faded - Alan Walker` -> Toca a música passada como parâmetro.',
    async execute(client, message, args, Discord) {
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send("Você precisa estar em um canal de áudio para utilizar este comando!");
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if(!permissions.has('CONNECT') || !permissions.has('SPEAK')) return message.channel.send("Você não possui a permissão necessária para utilizar este comando neste canal!");
        if(!args.length) return message.channel.send("Você precisa fornecer um link ou texto para busca do conteúdo!");
        const validURL = (str) => {
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            return regex.test(str);
        }
        let stream = undefined;
        let title = undefined;
        if(validURL(args[0])) {
            stream = ytdl(args[0], {filter: 'audioonly'});
            title = await ytdl.getInfo(args[0]).then(info => {
                return info.videoDetails.title.toString();
            });
        } else {
            const videoFinder = async (query) => {
                const videoResult = await ytSearch(query);
                return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
            }
            const video = await videoFinder(args.join(' '));
            if(video) {
                stream = ytdl(video.url, {filter: 'audioonly'});
                title = video.title;
            } else {
                message.channel.send("Vídeo não encontrado.");
            }
        }
        if(stream != undefined) {
            const conn = await voiceChannel.join();
            conn.play(stream, {seek: 0, volume: 1}).on('finish', () => {
                voiceChannel.leave();
            });
            await message.reply(`:arrow_forward: Reproduzindo: ***${title}***`);
        }
    }
}