const express = require('express');
const viewscontroller = require('../controllers/viewsController');
const authcontroller = require('../controllers/authController');

const router = express.Router();

router.get('/', authcontroller.isLoggedIn, viewscontroller.getOverview)
router.get('/tour/:slug', authcontroller.isLoggedIn, viewscontroller.getTour);
router.get('/login', authcontroller.isLoggedIn, viewscontroller.getLoginForm);
router.get('/me', authcontroller.protect, viewscontroller.getAccount);

//router.post('/submit-user-data', authcontroller.protect, viewscontroller.updateUserData);

module.exports = router;