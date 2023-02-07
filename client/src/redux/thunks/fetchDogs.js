const {API_KEY } = process.env;

const fetchPerros = async (queryparam) => {
   

    if(queryparam == ''){
       
        let perros = await fetch(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        let response = await perros.json();
        return response;
    }
    else{
        let perros = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${queryparam}&api_key=${API_KEY}`);
        let response = await perros.json();
        return response;
    }
    
    
}

module.exports = fetchPerros;