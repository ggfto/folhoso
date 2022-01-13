const config = require("../config/config");

const definition = {
    name: 'saindo',
    type: 'greeting',
    description: 'Mensagem de adeus randômica'
}


module.exports = {
    name: definition.name,
    description: definition.description,
    async execute(client, message, args, Discord) {
        let cmdActive = false;
        cmdActive = await config.isActive(message.guild.id, definition);
        let cmdTrigger = false;
        cmdTrigger = await config.willTrigger(message.guild.id, definition);
        if (!cmdActive) {
            return;
        }
        if (!cmdTrigger) {
            return;
        }
        message.reply(config.getRandomReply(replyBank));
    }
}

const replyBank = [
    "mundo caindo e você indo embora?",
    "quem te liberou?",
    "com autorização de quem?",
    "tem OS na sua fila?",
    "que Nossa Senhora do Parto te dê boas dores!",
    "como assim?",
    "você tá liberado! Bom descanso!",
    "a Gupy tá funcionando?"
];