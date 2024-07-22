const priceCategoryModel = require('../models/priceCategoryModel');
const db = require('../app/database');

exports.updatePrices = async (req, res) => {
    try {
        const updates = [];
        for (let key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                const id = key.replace('item', '');
                const price = req.body[key];
                updates.push([price, id]);
            }
        }
        
        await priceCategoryModel.updatePrices(updates);
        
        res.redirect('/price');
    } catch (err) {
        console.error('Hiba az árak frissítése során:', err);
        res.status(500).send('Hiba az árak frissítése során');
    }
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