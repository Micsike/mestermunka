const express = require('express');
const router = express.Router();
const db = require('../app/database');
const menuItems = require('../routes/menuItems');
const mailController = require('../controllers/mailController');
const pageController = require('../controllers/pageController');
const adminController = require('../controllers/adminController');
const { getPriceCategories } = require('../controllers/pricecategoryController');



// Oldalak útvonalai
router.get('/', pageController.index);
router.get('/contact', pageController.contact);
router.get('/gallery', pageController.gallery);
router.get('/services', pageController.services);
router.get('/admin', adminController.getAdminPage);

// Menüelemek útvonalai
menuItems.forEach(item => {
    router.get(`/${item.link}`, async (req, res) => {
        const tableName = item.link;

        try {
            const results = await dbQuery(`SELECT * FROM ${tableName}`);
            const priceCategories = await getPriceCategories();

            res.render('services', {
                menuItems: menuItems,
                trailers: results,
                priceCategories: priceCategories,
                title: 'Kölcsönző kezelése'
            });
        } catch (err) {
            console.error(`Hiba a lekérdezés során (${tableName}): ` + err.stack);
            res.status(500).send('Adatbázis lekérdezési hiba');
        }
    });
});
function dbQuery(sql) {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}


router.post('/send', mailController.sendEmail);

module.exports = router; 