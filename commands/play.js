const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const ytSearch = require('yt-search');

const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['pl', 'p', 'skip', 'stop', 'leave', 'nowplaying', 'np'],
    description: 'Tocar músicas do youtube. É necessário estar em um canal de áudio para utilizar o comando.',
    example: '`play Faded - Alan Walker` -> Toca a música passada como parâmetro. Também podem ser utilizados: `p`,`pl`.' +
        '\n`skip` -> Avança para a próxima música.' +
        '\n`stop` -> Limpa a lista e desconecta o bot do canal de áudio. Também pode ser utilizado: `leave`.' +
        '\n`nowplayng` -> Mostra o que está sendo executado no momento. Também pode ser utilizado: `np`.',
    async execute(client, message, args, Discord, cmd) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send("Você precisa estar em um canal de áudio para utilizar este comando!");
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) return message.channel.send("Você não possui a permissão necessária para utilizar este comando neste canal!");
        const serverQueue = queue.get(message.guild.id);
        if (cmd === 'play' || cmd === 'p' || cmd === 'pl') {
            if (!args.length) return message.channel.send("Você precisa fornecer um link ou texto para busca do conteúdo!");
            if (ytpl.validateID(args[0])) {
                const search = await ytpl(args[0], {
                    limit: 15
                });
                for (let i = 0; i < search.items.length; i++) {
                    let arr = [];
                    arr.push(search.items[i].shortUrl);
                    await addQueue(message, arr, voiceChannel);
                }
            }
            addQueue(message, args, voiceChannel);
        } else if (cmd === 'skip') {
            skipSong(message, serverQueue);
        } else if (cmd === 'stop' || cmd === 'leave') {
            stopSong(message, serverQueue);
        } else if (cmd === 'nowplaying' || cmd === 'np') {
            nowPlaying(message, serverQueue);
        }
    }
}

const addQueue = async (message, args, voiceChannel) => {
    const serverQueue = queue.get(message.guild.id);
    let song = {};
    if (ytdl.validateURL(args[0])) {
        const songInfo = await ytdl.getInfo(args[0]);
        song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url
        };
    } else {
        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        const video = await videoFinder(args.join(' '));
        if (video) {
            song = {
                title: video.title,
                url: video.url
            };
        } else {
            message.channel.send("Erro ao buscar vídeo/Vídeo não encontrado.");
        }
    }

    if (!serverQueue) {
        const queueConstructor = {
            voiceChannel: voiceChannel,
            textChannel: message.channel,
            connection: null,
            nowPlaying: null,
            songs: []
        }
        queue.set(message.guild.id, queueConstructor);
        queueConstructor.songs.push(song);

        try {
            const connection = await voiceChannel.join();
            queueConstructor.connection = connection;
            videoPlayer(message.guild, queueConstructor.songs[0]);
        } catch (err) {
            queue.delete(message.guild.id);
            message.channel.send('Erro ao conectar!');
            throw err;
        }
    } else {
        if (song.url === serverQueue.nowPlaying.url || serverQueue.songs.some(s => s.url === song.url)) return;
        serverQueue.songs.push(song);
        return message.channel.send(`:new: ***${song.title}*** adicionado(a) a fila, posição: ${serverQueue.songs.length}`);
    }
}

const videoPlayer = async (guild, song) => {
    const songQueue = queue.get(guild.id);
    if (!song) {
        songQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    songQueue.nowPlaying = song;
    const stream = ytdl(song.url, {
        filter: 'audioonly'
    });
    songQueue.connection.play(stream, {
            seek: 0,
            volume: 0.5
        })
        .on('finish', () => {
            songQueue.songs.shift();
            videoPlayer(guild, songQueue.songs[0]);
        });

    await songQueue.textChannel.send(`:arrow_forward: Reproduzindo: ***${song.title}***`);
}

const skipSong = async (message, serverQueue) => {
    if (!message.member.voice.channel) return message.channel.send('Você precisa estar em um canal de áudio para executar este comando!');
    if (!serverQueue) {
        return message.channel.send('Não há músicas na lista!');
    }
    try {
        let np = serverQueue.nowPlaying.title;
        serverQueue.connection.dispatcher.end();
        message.channel.send(`:track_next: Pulando ***${np}***`);
    } catch (err) {
        await message.channel.send('Erro ao trocar de música, a lista será esvaziada!');
        serverQueue.songs = [];
        await serverQueue.voiceChannel.leave();
        console.error(err);
    }
}

const stopSong = async (message, serverQueue) => {
    if (!message.member.voice.channel) return message.channel.send('Você precisa estar em um canal de áudio para executar este comando!');
    serverQueue.songs = [];
    try {
        serverQueue.connection.dispatcher.end();
    } catch (err) {
        await serverQueue.voiceChannel.leave();
        console.error(err);
    }
}

const nowPlaying = (message, serverQueue) => {
    message.channel.send(`:arrow_forward: Reproduzindo: ***${serverQueue.nowPlaying.title}***`)
}