const {API_KEY } = process.env;

const fetchPerros = async () => {
   

    // if(queryparam == ''){
       
        let perros = await fetch(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        let response = await perros.json();
        response.forEach(dog => {
            dog.comesFrom = 'API';
        });
        console.log(response);
        return response;
    // }
    // else{
    //     let perros = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${queryparam}&api_key=${API_KEY}`);
    //     let response = await perros.json();
    //     return response;
    // }
    
    
}

module.exports = fetchPerros;