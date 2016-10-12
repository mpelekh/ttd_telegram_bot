const
    express = require('express'),
    router  = express.Router();

module.exports = router;

const
    TelegramBot = require('node-telegram-bot-api'),
    botToken    = require('../../config/bot.json').token,
    recipients  = require('../../config/recipients.json'),
    bot         = new TelegramBot(botToken, {polling: true});

bot.on('message', botOnMessage);

router
    .post('/send', (req, res) => {
        const { msg } = req.body;

        recipients.forEach(recipient => bot.sendMessage(recipient.chatId, msg));

        res
            .status(200)
            .json({success: true});
    });


function botOnMessage(msg) {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Hello!');
}