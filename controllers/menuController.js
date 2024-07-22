// controllers/menuController.js
const menuItems = require('../models/menuItems');

// Controllerek logikája...

// Példa egy kontroller függvényre
exports.getMenu = (req, res) => {
    res.render('index', { menuItems: menuItems });
};
