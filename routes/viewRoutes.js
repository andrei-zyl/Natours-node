const express = require('express');
const viewscontroller = require('../controllers/viewsController');
const authcontroller = require('../controllers/authController');
const bookingcontroller = require('../controllers/bookingController');

const router = express.Router();

router.get('/', bookingcontroller.createBookingCheckout, authcontroller.isLoggedIn, viewscontroller.getOverview)
router.get('/tour/:slug', authcontroller.isLoggedIn, viewscontroller.getTour);
router.get('/login', authcontroller.isLoggedIn, viewscontroller.getLoginForm);
router.get('/me', authcontroller.protect, viewscontroller.getAccount);
router.get('/my-tours', authcontroller.protect, viewscontroller.getMyTours);

//router.post('/submit-user-data', authcontroller.protect, viewscontroller.updateUserData);

module.exports = router;