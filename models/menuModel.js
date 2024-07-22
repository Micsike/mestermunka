const db = require('../app/database');
exports.getAllPonyvas = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM ponyvas';
        db.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};
