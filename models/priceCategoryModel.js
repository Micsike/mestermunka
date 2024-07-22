const db = require('../app/database');


exports.getPriceCategories = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM pricecategory';
        db.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};
// Függvény az árak frissítésére
exports.updatePrices = async (updates) => {
    const query = 'UPDATE pricecategory SET price = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
        // Az adatbázis tranzakció kezeléséhez az egyes frissítések párhuzamosan futnak
        let completed = 0;
        updates.forEach(update => {
            db.query(query, update, (err, results) => {
                if (err) {
                    return reject(err);
                }
                completed += 1;
                if (completed === updates.length) {
                    resolve();
                }
            });
        });
    });
};
