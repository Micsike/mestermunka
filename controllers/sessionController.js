const renderAdminPage = (req, res) => {
    const message = req.session ? req.session.message || '' : '';
    const loggedIn = req.session ? req.session.loggedIn || false : false;
    res.render('admin/admin', { title: 'GIMIBO Admin felület', loggedIn, message });
};

module.exports = { renderAdminPage };