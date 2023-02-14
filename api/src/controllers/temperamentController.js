const { Temperament } = require('../db');
const temperamentController = {}



temperamentController.createTemperament = async (temperamentFromArray) => {
    const temperament =  await Temperament.create({
        name: temperamentFromArray
    })
    return temperament
}


temperamentController.getAllTemperaments = async () => {
    let temperaments = await Temperament.findAll();
    
    return temperaments
}




module.exports = temperamentController