const { Temperament } = require('../db');
const temperamentController = {}
temperamentController.createTemperament = async (temperamentFromArray) => {
    const temperament =  await Temperament.create({
        name: temperamentFromArray
    })
    return temperament
}


module.exports = temperamentController