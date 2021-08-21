module.exports = {
    name: 'retorno',
    description: 'Mensagem de retorno randômica',
    execute(message, args) {
        message.reply(getRandomReply());
    }
}

const replyBank = [
    "pensei que ia ficar o resto do dia atoa...",
    "finalmente ein?"
];

function getRandomReply() {
    return replyBank[getRandomInt(0,replyBank.length)];
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}