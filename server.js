const
    express    = require('express'),
    bodyParser = require('body-parser'),
    app        = express(),
    initializeRoutes = require('./routes'),
    port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

initializeRoutes(app);

app.listen(port);