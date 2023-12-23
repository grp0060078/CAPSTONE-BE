//routes/queryRoutes.js

const express = require('express');
const router = express.Router();
const queryController = require('../controllers/queryController');

router.post('/create', queryController.createQuery);
router.get('/list', queryController.getQueries);
router.put('/solve/:id', queryController.solveQuery);

module.exports = router;
