const TelegramBot = require('node-telegram-bot-api');
const axios 	  = require('axios');
// replace the value below with the Telegram token you receive from @BotFather
const token = '330329610:AAFuvzJGHPtjAIbcPDMbMxirIaUx2Q838ek';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  axios.get('http://api.program-o.com/v2/chatbot/?bot_id=12&format=json&say=' + msg.text)
  .then(function(res){
  	  // console.log(1)
  	  // let parse = res.data;
  	  // console.log(parse.botsay)
	  bot.sendMessage(chatId, res.data.botsay);
  })
  .catch(function(err)
  {
  	
  })

  // send a message to the chat acknowledging receipt of their message
});	