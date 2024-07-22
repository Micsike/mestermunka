const session = require('express-session');


module.exports = function sessionMiddleware(app) {
    app.use(session({
        secret: 'mysecret',
        resave: false,
        saveUninitialized: true
    }));

    app.use((req, res, next) => {
        if (!req.session.loggedIn) {
            req.session.loggedIn = false;
        }
        res.locals.loggedIn = req.session.loggedIn;
        next();
    });
};