const request = require('request');
const triggerWords = require('../chrome/contacts/contacts.json')
const yellowTriggerWords = require('../chrome/contacts/yellowTriggerWords.json')

function firstCycle(){
    request.post({ url: "http://127.0.0.1:2005", json: { funct: "process_telegram_login" } })
}

function secondCycle(){
    request.post({ url: "http://127.0.0.1:2005", json: { funct: "process_telegram_contact_to_two_w" } })
}

function thirdCycle(){
    request.post({ url: "http://127.0.0.1:2005", json: { funct: "process_telegram_contact_to_three_w"}})
}

function fourthCycle(){
    request.post({ url: "http://127.0.0.1:2005", json: { funct: "process_telegram_contact_to_two_p"}})
}

function fifthCycle(){
    request.post({ url: "http://127.0.0.1:2005", json: {funct: "process_telegram_contact_to_three_p"}})
}

function lastCycle(){
    request.post({ url: "http://127.0.0.1:2005", json: {funct: "process_telegram_contact_to_emoji"}})
}

async function triggerWordsFunc(msg){
    let triggerWord = JSON.parse(require('fs').readFileSync('chrome/contacts/contacts.json'))
    for (triggerWord in triggerWords){
        if (msg.from.username === triggerWord){
            await bot.sendMessage(msg.chat.id, "завершаю диалог")
        }
    }
    return false
  }

async function yellowTriggerWordsFunc(msg){
    let yellowTriggerWord = JSON.parse(require('fs').readFileSync('chrome/contacts/yellowTriggerWords.json'))
    for (yellowTriggerWord in yellowTriggerWords){
        if (msg.from.username === yellowTriggerWord){
            await bot.sendMessage(msg.chat.id, "hello world")
        }
    }
    return false
}
  

module.exports = {
    fifthCycle: fifthCycle,
    secondCycle: secondCycle,
    thirdCycle: thirdCycle,
    fourthCycle: fourthCycle,
    fifthCycle: fifthCycle,
    lastCycle: lastCycle,
    triggerWordsFunc: triggerWordsFunc,
    yellowTriggerWordsFunc: yellowTriggerWordsFunc
}
