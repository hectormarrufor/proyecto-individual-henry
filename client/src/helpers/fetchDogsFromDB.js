                
const fetchDogsFromDB = async(dispatch, insert_replacing) => {
    let perrosDB = await fetch(`${process.env.REACT_APP_API_URL}dogs`);
    perrosDB = await perrosDB.json();
    dispatch(insert_replacing(perrosDB));
    
}

export default fetchDogsFromDB;
