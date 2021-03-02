const express = require('express');
const viewscontroller = require('../controllers/viewsController');
const authcontroller = require('../controllers/authController');

const router = express.Router();

router.use(authcontroller.isLoggedIn);

router.get('/', viewscontroller.getOverview)
router.get('/tour/:slug', viewscontroller.getTour);
router.get('/login', viewscontroller.getLoginForm);

module.exports = router;