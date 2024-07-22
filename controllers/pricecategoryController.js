const db = require('../app/database');

function getPriceCategories() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM pricecategory';

        db.query(sql, (err, results) => {
            if (err) {
                console.error('Hiba az adatbázis lekérdezés során:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

module.exports = { getPriceCategories };