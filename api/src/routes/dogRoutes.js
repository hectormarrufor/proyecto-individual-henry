
const { Router } = require('express');
const router = Router();
const {getDogs, createDog, updateDog, deleteDog} = require('../controllers/dogController')

router.get('/', getDogs)

router.post('/create', createDog );

router.post('/update', updateDog);

router.post('/delete/:id', deleteDog)
module.exports = router;
