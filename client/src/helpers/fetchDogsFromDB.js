                
const fetchDogsFromDB = async(dispatch, insert_replacing) => {
    let perrosDB = await fetch('http://localhost:3001/dogs');
    perrosDB = await perrosDB.json();
    dispatch(insert_replacing(perrosDB));
    
}

export default fetchDogsFromDB;
