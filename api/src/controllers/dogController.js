

const { Dog, Temperament } = require('../db');
const { getAllTemperaments } = require('./temperamentController');
const dogController = {}



dogController.createDog = async (req, res) => {
    

    try {
        let temperamentsFromDB = await getAllTemperaments();
        const { name, weight, height, bred_for, breed_group, life_span, temperament, origin, image_url, comesFrom, id, favorite } = req.body;
    
        temperamentsFromDB = temperamentsFromDB.filter(x => temperament.includes(x.name));
    
        const dog = await Dog.create({
            weight_metric: weight.metric,
            weight_imperial: weight.imperial,
            height_metric: height.metric,
            height_imperial: height.imperial,
            id,
            name,
            bred_for,
            breed_group,
            life_span,
            origin,
            image_url,
            comesFrom,
            favorite
        });
        await dog.setTemperaments(temperamentsFromDB);
        res.status(200).send('dog created');
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}



dogController.updateDog = async (req, res) => {

    try {
        
        const { name, weight, height, bred_for, breed_group, life_span, temperament, origin, image_url, comesFrom, id, favorite} = req.body;
        let temperamentsFromDB = await getAllTemperaments();
        let dog = await Dog.findByPk(id);
        temperamentsFromDB = temperamentsFromDB.filter(x => temperament.includes(x.name));
        Dog.update({
            weight_metric: weight.metric,
            weight_imperial: weight.imperial,
            height_metric: height.metric,
            height_imperial: height.imperial,
            name,
            bred_for,
            breed_group,
            life_span,
            origin,
            image_url,
            favorite,
        },
        {
            where: {
                id: id
            }
        }
        ).then(() =>{
            
            dog.setTemperaments(temperamentsFromDB)
            res.status(200).send('updated dog')
        }).catch(err=> res.status(400).send(err.message));
        // console.log('esto es el dog: ', dog);
        // await dog.addTemperaments(temperamentsFromDB);
        // res.status(200).json(dog);
    } catch (error) {
        res.status(400).send(error.message)
    }
}




dogController.getDogs = async (req, res) => {
    try {
        Dog.findAll({include: Temperament})
            .then(dogs =>{
                 dogs = dogs.map(dog => {
                    //  console.log(dog);
                    let {name, bred_for, id, breed_group, life_span, origin, weight_metric, weight_imperial, height_metric, height_imperial, image_url, temperaments, favorite} = dog.dataValues;
                    temperaments = temperaments.map(temp => temp.dataValues.name).join(', ');
                    return({
                        name, 
                        bred_for, 
                        id, 
                        breed_group, 
                        life_span, 
                        origin, 
                        weight:{
                            metric: weight_metric,
                            imperial: weight_imperial, 
                        },
                        height: {
                            metric: height_metric,
                            imperial: height_imperial, 
    
                        },
                        image: {
                            url: image_url
                        },
                        temperament: temperaments,
                        comesFrom: 'DB',
                        favorite
                    });
                });
                res.status(200).json(dogs);
        
            })
    } catch (error) {
        res.status(400).send(error.message)
        
    }

}

dogController.deleteDog = async (req, res) => {
    try {
        let {id} = req.params;
        console.log(id);
        await Dog.destroy({
            where: {
                id: id
            }
        })
        res.status(200).send('deleted')
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = dogController