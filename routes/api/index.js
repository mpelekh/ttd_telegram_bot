const
    express = require('express'),
    router = express.Router();

router
    .post('/send', (req, res, next) => {
        console.log(req.body);
        res.json({success: true});
    });

module.exports = router;