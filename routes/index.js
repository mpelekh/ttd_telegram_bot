module.exports = initializeRoutes;

function initializeRoutes(app) {
    app.use('/api', require('./api'));
}
