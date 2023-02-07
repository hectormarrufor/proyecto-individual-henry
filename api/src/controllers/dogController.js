const { Dog } = require('../db');
const dogController = {}
dogController.createDog = async (req , res) => {
    const dog =  await Dog.create({
        weight: "30kg",
        height: '30cm',
        id: 1,
        name: "affenspinscher",
        bred_for: "guard",
        breed_group: "toy",
        life_span: "10 - 12 t=years",
        temperament: "docile",
        origin: "france",
        reference_image_id:"hola"
    })
    res.status(200).send(dog)
}

dogController.getDogs = async(req, res) => {

    const dogs =await Dog.findAll()
    res.status(200).json(dogs);
    
}

module.exports = dogController