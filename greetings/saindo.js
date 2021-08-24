module.exports = {
    name: 'saindo',
    description: 'Mensagem de Adeus randômica',
    execute(client, message, args, Discord) {
        message.reply(getRandomReply());
    }
}

const replyBank = [
    "mundo caindo e você indo embora?",
    "quem te liberou?",
    "com autorização de quem?",
    "a Rachel tá sabendo?",
    "tem OS na sua fila?",
    "que Nossa Senhora do Parto te dê boas dores!",
    "como assim?",
    "você tá liberado! Bom descanso!",
    "a Complementar tá funcionando?"
];

function getRandomReply() {
    return replyBank[getRandomInt(0,replyBank.length)];
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}