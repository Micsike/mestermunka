const { getPriceCategories } = require('./pricecategoryController');
const menuItems = require('../routes/menuItems');
const { getAllPonyvas } = require('../models/menuModel');
const { getProjects } = require('../models/adminModel');

exports.index = (req, res) => {
    res.render('index', { title: 'Üdvözöljük a GIMIBO kft. oldalán!' });
};

exports.contact = (req, res) => {
    res.render('contact', { title: 'Elérhetőségeink' });
};


exports.gallery = async (req, res) => {
    try {
        const projects = await getProjects(); // Minden projekt lekérése
        res.render('gallery', { projects, title: 'Eddigi munkáink' }); // A projects változó átadása a gallery.ejs-nek
    } catch (error) {
        console.error(error);
        res.status(500).send('Hiba történt a projektek betöltése közben.');
    }
};



exports.services = async (req, res) => {
    try {
        // Lekérdezzük az utánfutókat
        const trailers = await getAllPonyvas();

        // Lekérdezzük az árkategóriákat
        const priceCategories = await getPriceCategories();

        // Rendereljük a 'services' oldalt az adatokat tartalmazó változókkal
        res.render('services', {
            trailers: trailers,
            priceCategories: priceCategories,
            menuItems: menuItems,
            title: 'Utánfutó kölcsönzés'
        });
    } catch (err) {
        console.error('Hiba a lekérdezések során:', err);
        res.status(500).send('Database query error');
    }
};