const db = require('../app/database');

const query = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

exports.getTrailers = () => {
    const sql = 'SELECT * FROM ponyvas';
    return query(sql);
};

exports.getProjects = () => {
    const sql = 'SELECT id, galleryImagepath FROM projects';
    return query(sql);
};



exports.getImagePath = (tableName, id) => {
    const sql = `SELECT imagePath FROM ${tableName} WHERE id = ?`;
    return query(sql, [id]);
};




exports.deleteItem = async (tableName, id) => {
    const sql = `DELETE FROM ?? WHERE id = ?`;
    try {
        const result = await query(sql, [tableName, id]);
        return result;
    } catch (error) {
        console.error('Hiba a törlés során:', error);
        throw error;
    }
};
exports.deleteProject = (id) => {
    const sql = 'DELETE FROM projects WHERE id = ?';
    return query(sql, [id]);
};
exports.getDynamicData = (tableName) => {
    const sql = `
        SELECT ${tableName}.*, pricecategory.*
        FROM ${tableName}
        INNER JOIN pricecategory ON ${tableName}.priceCategoryId = pricecategory.id
    `;
    return query(sql);
};
exports.getAllIds = async (tableName) => {
    const sql = `SELECT id FROM ??`;
    try {
        const results = await query(sql, [tableName]);
        return results.map(row => row.id);
    } catch (error) {
        console.error('Hiba az id-k lekérdezése során:', error);
        throw error;
    }
};
exports.getItemsByTable = async (tableName) => {
    const sql = `SELECT * FROM ??`;
    try {
        const results = await query(sql, [tableName]);
        return results;
    } catch (error) {
        console.error('Hiba a lekérdezés során:', error);
        throw error;
    }
};