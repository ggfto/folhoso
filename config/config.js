const db = require('./db');
const Command = require("../config/command");

exports.dbSync = async function () {
    await db.sync().catch(console.error);
}

exports.hasPermission = function (message, permissions) {
    let result = false;
    if (message.author.bot) return result;
    for (p of permissions) {
        result = message.member.hasPermission(p.value);
        if (result) break;
        result = message.channel.permissionsFor(message.member).has(p.value);
        if (result) break;
    }
    return result;
}

exports.getRandomReply = function (replyBank) {
    return replyBank[getRandomInt(0, replyBank.length)];
}

exports.isActive = async function (server, definition) {
    const config = await Command.findOne({
        where: {
            server: server,
            type: definition.type,
            name: definition.name
        }
    }).catch(console.error);
    if (config) {
        const value = JSON.parse(config.value);
        if (value) return value.active == 'true';
    }
    return false;
}

exports.willTrigger = async function (server, definition) {
    let result = false;
    const config = await Command.findOne({
        where: {
            server: server,
            type: definition.type,
            name: definition.name
        }
    }).catch(console.error);
    if (config) {
        const value = JSON.parse(config.value);
        if (value) {
            percent = value.triggerPercent;
            if (percent) {
                if (percent == 100) return true;
                else {
                    let val = getRandomInt(1, 100);
                    return val <= percent;
                }
            }
        }
    }
    return result;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}