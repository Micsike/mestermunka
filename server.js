require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const session = require('express-session');
const multer = require('multer');
const app = express();
const PORT = 8080;

const database = require('./app/database.js');
const pages = require('./routes/pages');
const sessionMiddleware = require('./middlewares/session');
const requireLogin = require('./middlewares/requireLogin.js');
const adminRoutes = require('./routes/adminRoutes');
const uploadRoutes = require('./routes/uploadRoutes');





app.use(bodyParser.urlencoded({ extended: true }));
sessionMiddleware(app);


app.use('/protected', requireLogin);
app.use(adminRoutes);
app.use(uploadRoutes);



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
console.log(__dirname);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/media/thumb')));
// Útvonalak beállítása

app.use('/', pages); // Fő oldalak
app.use('/admin', requireLogin, adminRoutes); // Admin oldalak
app.use('/upload', uploadRoutes); // Feltöltési oldalak

app.listen(process.env.PORT || 8081)

