const { Router } = require('express');
const { createTemperament, getAllTemperaments } = require('../controllers/temperamentController');
const router = Router();


router.post('/setTemperaments', async (req, res) => {
    try {
        req.body.forEach(temperament => {
            createTemperament(temperament);
        });
        res.status(200).json(req.body)
        
    } catch (err) {
        res.status(400).send(err.message)
        
    }
})



router.get('/', async (req, res) => {
    try{
        const temperaments = await getAllTemperaments();
    res.status(200).json(temperaments);
    }
    catch (err){
        res.status(400).send(err.message)
    }
} );
module.exports = router;
