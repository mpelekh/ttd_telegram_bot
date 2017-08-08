# Simple telegram bot

May be used for broadcast notification recipients.

Bot token must be added in ```config/bot.json```.

Recipiants will be added only after sending first message to bot.

Created simple API to send message for broadcast notification.

```js
router
    .post('/send', (req, res) => {
        const { msg } = req.body;

        recipients.forEach(recipient => bot.sendMessage(recipient.chatId, msg));

        res
            .status(200)
            .json({success: true});
    });
```
