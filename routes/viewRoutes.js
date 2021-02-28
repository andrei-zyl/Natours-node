const express = require('express');
const viewscontroller = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewscontroller.getOverview)
router.get('/tour/:slug', viewscontroller.getTour);

module.exports = router;