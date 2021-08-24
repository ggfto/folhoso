module.exports = {
    name: 'bomdia',
    description: 'Mensagem de bom dia randômica',
    execute(client, message, args, Discord) {
        message.reply(getRandomReply());
    }
}

const replyBank = [
    "bom dia pra quem?",
    "bom dia princesa!",
    "bom dia? Só se for pra você!",
    "bom dia? Tá mais pra boa tarde!",
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