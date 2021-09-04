const db = require('./db');
const Configuration  = require('../config/configuration');
const Command = require("../config/command");

exports.dbSync = async function() {
    await db.sync().catch(console.error);
}

exports.hasPermission = function(message, permissions) {
    let result = false;
    for(p of permissions) {
        result = message.member.hasPermission(p.value);
        if(result) break;
        result = message.channel.permissionsFor(message.member).has(p.value);
        if(result) break;
    }
    return result;
}

exports.getRandomReply = function(replyBank) {
    return replyBank[getRandomInt(0,replyBank.length)];
}

exports.isActive = async function(server, command) {
    const cmdCfg = await Command.findOne({
        where: {
            server: server,
            type: command.type,
            name: command.name
        }
    }).catch(console.error);
    if(cmdCfg) {
        const cfg = JSON.parse(cmdCfg.value);
        if(cfg) return cfg.active;
    }
    return false;
}

exports.willTrigger = async function(server, command) {
    let result = false;
    const cmdCfg = await Command.findOne({
        where: {
            server: server,
            type: command.type,
            name: command.name
        }
    }).catch(console.error);
    if(cmdCfg) {
        const cfg = JSON.parse(cmdCfg.value);
        if(cfg) {
            percent = cfg.triggerPercent;
            if(percent) {
                if(percent == 1) return true;
                else {
                    fifth = percent/2;
                    return getRandomInt(1, percent) > fifth;
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