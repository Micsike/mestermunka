const adminModel = require('../models/adminModel');
const priceCategoryModel = require('../models/priceCategoryModel');
const fs = require('fs');
const adminMenuItems = require('../routes/adminMenuItems');



exports.getAdminPage = (req, res) => {
    const message = req.session.message || '';
    res.render('admin/admin', { title: 'GIMIBO Admin felület', loggedIn: req.session.loggedIn, message });
};

exports.submitLogin = (req, res) => {
    const { name, password } = req.body;
    let message = '';

    if (name === 'ad' && password === 'ad') {
        req.session.loggedIn = true;
        message = 'Sikeres bejelentkezés!';
    } else {
        req.session.loggedIn = false;
        message = 'Hibás felhasználónév vagy jelszó!';
    }

    res.render('admin/admin', { title: 'Admin felület', loggedIn: req.session.loggedIn, message });
};

exports.getTrailers = async (req, res) => {
    try {
        const results = await adminModel.getTrailers();
        const priceCategories = await priceCategoryModel.getPriceCategories();
        res.render('admin/trailers', { menuItems: adminMenuItems, trailers: results, priceCategories, tableName: 'ponyvas', title: 'Kölcsönző kezelése' });
    } catch (err) {
        console.error('Hiba a lekérdezés során: ', err);
        res.status(500).send('Hiba történt az adatok lekérése során');
    }
};

exports.getProjects = async (req, res) => {
    try {
        const results = await adminModel.getProjects();
        res.render('admin/projects', {projects: results, title: 'Kész projektek képgyűjtemény'});
    } catch (err) {
        console.error('Hiba a lekérdezés során: ', err);
        res.status(500).send('Hiba történt az adatok lekérése során');
    }

};


exports.getNewPage = (req, res) => {
    const priceCategories = ['Ponyvás', 'Fékes', 'Lószállító', 'Vegyes', 'Trailer'];
    const category = ['ponyvas', 'frame', 'vegyes', 'bike', 'hosszu', 'horse', 'trailer'];
    res.render('admin/new', { menuItems: adminMenuItems, category, priceCategories, title: 'Kölcsönző kezelése' });
};


exports.getPricePage = async (req, res) => {
    try {
        const results = await priceCategoryModel.getPriceCategories();
        res.render('admin/price', { currentPrices: results, title: 'Árak módosítása' });
    } catch (err) {
        console.error('Hiba a priceCategories lekérdezése során:', err);
        res.status(500).send('Hiba történt az adatok lekérése során');
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/'); // átirányítás a főoldalra
    });
};
exports.getDynamicPage = async (req, res) => {
    const tableName = req.params.tableName;

    try {
        const priceCategories = await priceCategoryModel.getPriceCategories();
        const results = await adminModel.getDynamicData(tableName);
        
        res.render('admin/trailers', {
            menuItems: adminMenuItems,
            trailers: results,
            tableName: tableName,
            priceCategories: priceCategories,
            title: 'Kölcsönző kezelése'
        });
    } catch (err) {
        console.error(`Hiba a lekérdezés során (${tableName}): `, err);
        res.status(500).send('Adatbázis lekérdezési hiba');
    }
};
exports.deleteItem = async (req, res) => {
    const { tableName, id } = req.params;
    console.log('Törölni kívánt táblanév:', tableName);
    console.log('Törölni kívánt ID:', id);

    try {
        await adminModel.deleteItem(tableName, id);
        res.redirect(`/${tableName}`); // Átirányítás a megfelelő admin oldalra
    } catch (error) {
        console.error('Hiba történt a törlés során:', error);
        res.status(500).send('Hiba történt a törlés során');
    }
};