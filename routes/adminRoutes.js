const express = require('express');
const fs = require('fs');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const db = require('../app/database');
const adminMenuItems = require('./adminMenuItems');
const adminModel = require('../models/adminModel');
const adminController = require('../controllers/adminController');
const priceController = require('../controllers/priceController');





router.post('/submit', adminController.submitLogin);
router.get('/trailers', requireLogin, adminController.getTrailers);
router.get('/new', requireLogin, adminController.getNewPage);
router.post('/delete/:tableName/:id', adminController.deleteItem);
router.get('/price', requireLogin, adminController.getPricePage);
router.get('/logout', adminController.logout);
router.post('/update-prices', requireLogin, priceController.updatePrices);
router.get('/projects', requireLogin, adminController.getProjects);









adminMenuItems.forEach(item => {
    router.get(`/${item.link}`, requireLogin, (req, res) => {
        req.params.tableName = item.tableName; // Hozzáadjuk a tableName paramétert
        adminController.getDynamicPage(req, res);
    });
});


module.exports = router;