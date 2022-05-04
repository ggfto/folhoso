const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const yts = require('yt-search');

const queue = new Map();
let memes = [];

module.exports = {
    name: 'meme',
    description: `Envia um meme e apaga a mensagem do comando.\n Disponíveis: ${getMemeHelp()}`,
    example: '`meme errou` -> Retorna o meme Errou do Faustão.',
    async execute(client, message, args, Discord) {
        memes = populateMemes();
        const voiceChannel = message.member.voice.channel;
        const meme = getMeme(args[0])
        const user = args[1] || '';
        await message.channel.messages.fetch({
            limit: 1
        }).then(messages => {
            message.channel.bulkDelete(messages);
        }).catch(error => {
            message.reply(error);
        });
        if(meme != undefined) {
            if (!voiceChannel || (meme.value == undefined || meme.value == '')) return message.channel.send(`${meme.description} ${user}`);
            const permissions = voiceChannel.permissionsFor(message.client.user);
            if (!permissions.has('CONNECT') || !permissions.has('SPEAK')){
                return message.channel.send("Você não possui a permissão necessária para utilizar este comando neste canal!");
            }
            addQueue(message, meme.value, voiceChannel);
        }
    }
}

function getMeme(name) {
    for(let meme of memes) {
        if(meme.name == name) return meme;
    }
}

function getMemeHelp() {
    let result = "";
    for(let meme of populateMemes()) {
        if(result != "") result += ",";
        result += "`" + meme.name + "`";
    }
    return result;
}

const addQueue = async (message, args, voiceChannel) => {
    const serverQueue = queue.get(message.guild.id);
    let song = {};
    if (ytdl.validateURL(args)) {
        const songInfo = await ytdl.getInfo(args);
        song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url
        };
    } else {
        const videoFinder = async (query) => {
            const videoResult = await yts(query);
            if(videoResult)
                return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
            else
                message.channel.send("Erro ao tentar buscar vídeo.");
        }

        const video = await videoFinder(args);
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
        return;
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

    return;
}

function populateMemes() {
    memes.push({
        name: 'errou',
        value: 'https://www.youtube.com/watch?v=qPl_ToZtDoQ',
        description: '**ERRRRRRRRRROOOOOU!**'
    });
    memes.push({
        name: 'moises',
        value: 'https://www.youtube.com/watch?v=PZ4Ppr6JCWs',
        description: '**Moisés, não consegue né?!**'
    });
    memes.push({
        name: 'dlc',
        value: 'https://www.youtube.com/watch?v=xkXLfQRYkRQ',
        description: '**Ai qui diliça!**'
    });
    memes.push({
        name: 'papai',
        value: 'https://www.youtube.com/watch?v=XyHZyfZZUpw',
        description: '**Aqui não tem empregada, aqui não tem mamãe, aqui não tem papai para poder limpar as merdas de vocês!**'
    });
    memes.push({
        name: 'dinossauro',
        value: 'https://www.youtube.com/watch?v=uNOqvtQfPks',
        description: '**DESGRAAAAAAAAAAAAAAAAAAÇA!**'
    });
    memes.push({
        name: 'fdp',
        value: 'https://www.youtube.com/watch?v=YewUtVP2_5c',
        description: '**FILHO DA PUUUUUUUUUUUTA!**'
    });
    memes.push({
        name: 'cafe',
        value: '',
        description: '**Vai um cafezinho aí, ô filha da puta?!**'
    });
    memes.push({
        name: 'naosabia',
        value: 'https://www.youtube.com/watch?v=4S_1T-ZjYqU',
        description: '**Que merda ein?! Sabia não**'
    });
    memes.push({
        name: 'louco',
        value: 'https://www.youtube.com/watch?v=xdhoVJLIWv8',
        description: '**Quando eu falo isso, eu sou louco?!**'
    });
    return memes;
}