module.exports = function requireLogin(req, res, next) {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect('/admin'); // vagy más útvonalra irányítás
    }
};