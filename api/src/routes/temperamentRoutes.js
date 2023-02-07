const { Router } = require('express');
const { createTemperament } = require('../controllers/temperamentController');
const router = Router();


router.post('/setTemperaments', async (req, res) => {
    console.log(req.body);
    req.body.forEach(temperament => {
        createTemperament(temperament);
    });
    res.status(200).json(req.body)
})

router.get('/',  );
module.exports = router;
