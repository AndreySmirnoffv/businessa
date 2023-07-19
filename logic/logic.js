const request = require('request')

function startServerCycle(){
    request.post({ url: "http://localhost:2000", json: { funct: "start_server"}})
}

function firstCycle(){
    request.post({ url: "http://localhost:2000", json: { funct: "process_telegram_login" } })
}

function secondCycle(){
    request.post({ url: "http://localhost:2000", json: { funct: "process_telegram_contact" } })
}

module.exports = {
    startServerCycle: startServerCycle,
    firstCycle: firstCycle,
    secondCycle: secondCycle
}
