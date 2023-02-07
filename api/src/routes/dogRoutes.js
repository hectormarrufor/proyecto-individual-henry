
const { Router } = require('express');
const router = Router();
const {getDogs, createDog} = require('../controllers/dogController')

router.get('/', getDogs)

router.get('/create', createDog );
module.exports = router;
