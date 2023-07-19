require("dotenv").config({ path: "./assets/modules/.env" });
const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(process.env.tokenTest, { polling: true });
const users = require("./chrome/contacts/contacts.json");
const fs = require("fs");
const triggerWords = require('./chrome/contacts/contacts.json');
const { firstCycle, secondCycle, startServerCycle } = require("./logic/logic");

async function triggerWordsFunc(msg){
  let triggerWord = JSON.parse(fs.readFileSync('./chrome/contacts/contacts.json'))
  for (triggerWord in triggerWords){
      if (msg.from.username === triggerWord){
          await bot.sendMessage(msg.chat.id, "завершаю диалог")
      }
  }
  return false
}

bot.on("message", async (msg) => {
  if (msg.text === "/start") {
    startServerCycle()
    await bot.sendMessage(msg.chat.id, "hello world");
    let user = users.filter(x => x.username === msg.from.username)[0];
    if (!user) {
      users.push({
        username: msg.from.username,
      });
      fs.writeFileSync(
        "./chrome/contacts/contacts.json",
        JSON.stringify(users, null, "\t")
      );
      triggerWordsFunc(msg)
      if (!triggerWordsFunc(msg)){
        firstCycle()
        secondCycle()
      }
      console.log("user added to json");
    } else {
      triggerWordsFunc(msg)
      // firstCycle()
      // secondCycle()
      console.log("user exists in base");
      }
  }
  if (!triggerWordsFunc(msg)) {
    if (msg.from.first_name === msg.from.first_name + " 2в") {
      if (msg.text.length >= 20 || msg.audio?.duration == 5) {
        await bot.sendMessage(msg.chat.id, "молодец теперь след");
      } else {
        await bot.sendMessage(msg.chat.id, "мало символов");
      }
    }else{
      await bot.sendMessage(msg.chat.id, "что то не так с парсером")
    }
  }
  if (!triggerWordsFunc(msg)) {
    if (msg.from.first_name === "2в") {
        if (msg.text.length >= 20 || msg.audio?.duration == 5) {
          await bot.sendMessage(msg.chat.id, "красава");
        } else {
          await bot.sendMessage(msg.chat.id, "мало символов");
        }
      }
  }

  if (msg.from.first_name === "👍") {
    if (msg.text.length >= 20 || msg.audio?.duration == 5) {
      await bot.sendMessage(msg.chat.id, "крос опрсо закончен");
    } else {
      await bot.sendMessage(msg.chat.id, "мало символов");
    }
  }
});


bot.on('polling_error', console.log)