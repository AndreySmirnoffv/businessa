require("dotenv").config({ path: "./assets/modules/.env" });
const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(process.env.devStatus ? process.env.tokenTest : process.env.tokenDefault, { polling: true });
const users = require("./chrome/contacts/contacts.json");
const { firstCycle, secondCycle, thirdCycle, fourthCycle, fifthCycle, lastCycle, triggerWordsFunc, yellowTriggerWordsFunc} = require("./logic/logic");

bot.on("message", async (msg) => {
  if (msg.text === "/start") {
    await bot.sendMessage(msg.chat.id, "hello world");
    let user = users.filter(x => x.username === msg.from.username)[0];
    if (!user) {
      users.push({
        username: msg.from.username,
        chatId: msg.chat.id
      });
      require('fs').writeFileSync("./chrome/contacts/contacts.json", JSON.stringify(users, null, "\t"));
      triggerWordsFunc(msg)
      yellowTriggerWordsFunc(msg)
    } else {
      triggerWordsFunc(msg)
      yellowTriggerWordsFunc(msg)
      firstCycle()
      secondCycle()
      }
  }
  if (!triggerWordsFunc(msg) || !yellowTriggerWordsFunc(msg) && msg.from.first_name === msg.from.first_name + " 2в" && msg.text.length >= 20 || msg.audio?.duration == 5) {
      bot.forwardMessage(msg.chat.id, process.env.fromChatId, 500)
      bot.forwardMessage(msg.chat.id, process.env.fromChatId, 501)
      bot.forwardMessage(msg.chat.id, process.env.fromChatId, 503)
        thirdCycle()
      } else if (yellowTriggerWordsFunc(msg)){
      fourthCycle()
      await bot.sendMessage(msg.chat.id, "hello world")
    }else await bot.sendMessage(msg.chat.id, "вы дали не верный ответ")
  

  if (!triggerWordsFunc(msg) || !yellowTriggerWordsFunc(msg) && msg.from.first_name === msg.from.first_name + " 3в" && msg.text.length >= 20 || msg.audio?.duration == 5) {
    bot.sendMessage(msg.chat.id, `hello world ${msg.from.first_name}`)
    bot.forwardMessage(msg.chat.id, process.env.fromChatId, 537)
    bot.forwardMessage(msg.chat.id, process.env.fromChatId, 538)
    bot.forwardMessage(msg.chat.id, process.env.fromChatId, 539)
    
  }else if (yellowTriggerWordsFunc()){
    fifthCycle(msg)
  }else return
  
  if (!yellowTriggerWordsFunc(msg) || !yellowTriggerWordsFunc(msg) && msg.from.first_name === msg.from.first_name + " 👍" && msg.text.length >= 20 || msg.audio?.duration == 5){
    bot.forwardMessage(msg.chat.id, process.env.fromChatId, 540)
    bot.forwardMessage(msg.chat.id, process.env.fromChatId, 541)
    bot.forwardMessage(msg.chat.id, process.env.fromChatId, 542)
    } else {
      await bot.sendMessage(msg.chat.id, "вы дали неверный ответ");
    }
})


bot.on('polling_error', console.log)