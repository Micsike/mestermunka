require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST, // Adatbázis szerver címe
    user: process.env.DB_USER,  // Felhasználónév
    password: process.env.DB_PASSWORD, // Jelszó
    database: process.env.DB_NAME // Adatbázis neve
});

db.connect((err) => {
    if (err) {
        console.error('Hiba a kapcsolódáskor:');
        console.error(err);
        return;
    }
    console.log('Kapcsolódva az adatbázishoz az ID: ' + db.threadId);
});
module.exports = db;