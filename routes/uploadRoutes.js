const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../app/database');
const { getPriceCategories } = require('../controllers/pricecategoryController');

// Multer konfiguráció a képfeltöltéshez
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/media/thumb/'); // Képek mentési helye
    },
    filename: function (req, file, cb) {
        // Egyedi fájlnév generálása: időbélyeg + eredeti kiterjesztés
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});
const upload = multer({ storage: storage });
const storageGallery = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/media/gallery/'); // Képek mentési helye
    },
    filename: function (req, file, cb) {
        // Egyedi fájlnév generálása: időbélyeg + eredeti kiterjesztés
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});
const uploadgallery = multer({ storage: storageGallery });

const categoryToTable = {
    'ponyvas': 'ponyvas',
    'frame': 'frame',
    'vegyes': 'vegyes',
    'bike': 'bike',
    'hosszu': 'hosszu',
    'horse': 'horse',
    'trailer': 'trailer'
};
// PriceCategory ID társítás
const priceCategoryMap = {
    'Ponyvás': 1,
    'Fékes': 2,
    'Lószállító': 3,
    'Vegyes': 4,
    'Trailer': 5
};





// Űrlap megjelenítése
router.get('/new', (req, res) => {
    
    res.render('new');
});

// Űrlap feldolgozása
router.post('/new', upload.single('image'), (req, res) => {
    const { name, description, category, priceCategory, size } = req.body;
    const imagePath = '/media/thumb/' + req.file.filename; // Feltöltött kép elérési útvonala



    // Kiválasztjuk a táblát a kategória alapján
    const tableName = categoryToTable[category];

    if (category !== 'ponyvas' && category !== 'frame' && category !== 'vegyes' && category !== 'bike' && category !== 'hosszu' && category !== 'horse' && category !== 'trailer') {
        return res.status(400).send('Érvénytelen kategória');
    }
     // Beolvassuk a priceCategory ID-ját
     const priceCategoryId = priceCategoryMap[priceCategory];
     if (!priceCategoryId) {
         return res.status(400).send('Érvénytelen árkategória');
     }

    // Adatbázisba mentés (példában MySQL)
    const sql = `INSERT INTO ${tableName} (name, description, imagePath, size, priceCategoryId ) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [name, description, imagePath, size, priceCategoryId], (err ) => {
        if (err) {
            console.error('Hiba az adatbázisba történő mentés során:', err);
            return res.status(500).send('Adatbázis hiba');
        }
        res.redirect('/new'); // Átirányítás főoldalra vagy egy másik helyre
    });
    
});
router.post('/projects', uploadgallery.single('image'), (req, res) => {
    //const { name, description, category, priceCategory, size } = req.body;
    const galleryImagepath = '/media/gallery/' + req.file.filename; // Feltöltött kép elérési útvonala


    const sql = `INSERT INTO projects (galleryImagepath) VALUES (?)`;
    db.query(sql, [galleryImagepath], (err ) => {
        if (err) {
            console.error('Hiba az adatbázisba történő mentés során:', err);
            return res.status(500).send('Adatbázis hiba');
        }
        res.redirect('/projects'); // Átirányítás főoldalra vagy egy másik helyre

    });



});




module.exports = router;