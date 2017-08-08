const
    express = require('express'),
    router  = express.Router()
    fs = require('fs');

module.exports = router;

const PATH_TO_RECIPIANTS = './config/recipients.json';

const
    TelegramBot = require('node-telegram-bot-api'),
    botToken    = require('../../config/bot.json').token,
    bot         = new TelegramBot(botToken, {polling: true});

let recipients  = [];

try {
    recipients = require('../../config/recipients.json');
} catch (error) {
    recipients  = [];
}

bot.on('message', botOnMessage);

router
    .post('/send', (req, res) => {
        const { msg } = req.body;
	const now = new Date();

        recipients.forEach(recipient => {
            bot.sendMessage(recipient.id, msg)
                .then(result => console.log(now, result))
                .catch(error => console.error(now, {recipient}, error));
        });

        res
            .status(200)
            .json({success: true});
    });


function botOnMessage(msg) {
    const recipient = recipients.find(user => user.id === msg.chat.id);

    if(!recipient) {
        recipients.push(msg.chat);
        fs.writeFile('./config/recipients.json', JSON.stringify(recipients), error => {
            error && console.error(error);
        });
    }

    bot.sendMessage(msg.chat.id, 'Hello!');
}
