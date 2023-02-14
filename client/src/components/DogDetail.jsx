import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import arrowLeft from '../assets/arrow-left.png';
import arrowRight from '../assets/arrow-right.png';
import './DogDetail.css'
import axios from 'axios';
import fetchDogsFromDB from "../helpers/fetchDogsFromDB";
import { insert_replacing, restore_dog_from_api } from "../redux/slices/dogSlice";


const DogDetail = ({ setActiveID, id, dogArray, popupMessage }) => {
    const navigate = useNavigate();

    // const { dogs } = useSelector(state => state.dogReducer)
    const dispatch = useDispatch();
    const dog = dogArray.find(x => x.id == id);


    let dogIndex = dogArray.findIndex(x => x.id == id);

    const handleClick = (e) => {
        let name;

        if (e.target.localName == 'img') {
            name = e.target.parentElement.name
        }
        else name = e.target.name

        switch (name) {
            case "close":
                setActiveID(undefined);
                break;
            case "next":
                dogIndex < dogArray.length - 1 && dogIndex++;
                setActiveID(dogArray[dogIndex].id);

                break;
            case "previous":
                dogIndex > 0 && dogIndex--;
                setActiveID(dogArray[dogIndex].id);

                break;
            case "to-form":
                navigate('/create', { state: { ...dog } })

                break;
            case "delete-dog":
                let id = dog.id;
                if (dogIndex < dogArray.length - 1){ dogIndex++;
                    setActiveID(dogArray[dogIndex].id);
                
                }
                else if( dogIndex > 0) {dogIndex--;
                    setActiveID(dogArray[dogIndex].id);
                
                }
                else setActiveID(undefined);
                axios.post(`http://localhost:3001/dogs/delete/${id}`)
                    .then(() => {
                        dispatch(restore_dog_from_api(id));
                        // window.location.reload(false)
                        popupMessage();
                    }

                    )
                    .catch(err => { throw Error(err.message) })


                break;
            case 'fav':
                (async function () {

                    let { name, weight, height, bred_for, breed_group, life_span, temperament, origin, image_url, comesFrom, id, favorite, image, } = dog;

                    if (favorite === true) {
                        let id = dog.id;
                        if (dogIndex < dogArray.length - 1){ dogIndex++;
                            setActiveID(dogArray[dogIndex].id);
                        
                        }
                        else if( dogIndex > 0) {dogIndex--;
                            setActiveID(dogArray[dogIndex].id);
                        
                        }
                        else setActiveID(undefined);
                        await axios.post('http://localhost:3001/dogs/update', {
                            name,
                            weight,
                            height,
                            bred_for,
                            breed_group,
                            life_span,
                            temperament,
                            origin,
                            image_url,
                            comesFrom,
                            id,
                            favorite: false
                        })
                            .then(console.log('updated')).catch(err => console.log(err.message))

                    }
                    else {
                        if (dog.comesFrom === 'API') {
                            console.log('entrando a guardar el perro desde la API a la DB')
                            let weight = { imperial: dog.weight.imperial, metric: dog.weight.metric }
                            let height = { imperial: dog.height.imperial, metric: dog.height.metric }
                            await axios.post('http://localhost:3001/dogs/create', {
                                name,
                                weight,
                                height,
                                bred_for,
                                breed_group,
                                life_span,
                                temperament,
                                origin,
                                image_url: image.url,
                                comesFrom,
                                id,
                                favorite: true
                            })
                                .then(console.log('updated')).catch(err => console.log(err.message))

                        }
                        else {

                            await axios.post('http://localhost:3001/dogs/update', {
                                name,
                                weight,
                                height,
                                bred_for,
                                breed_group,
                                life_span,
                                temperament,
                                origin,
                                image_url,
                                comesFrom,
                                id,
                                favorite: true
                            })
                                .then(console.log('updated')).catch(err => console.log(err.message))

                        }

                    }
                    await fetchDogsFromDB(dispatch, insert_replacing);


                })();
                break;
        }
    }

    return (
        <div className="dog-detail">
            <div className="card">
                <button onClick={handleClick} className="btn btn-close" name="close">{'<<volver'}</button>
                <button onClick={handleClick} className={`btn btn-next ${dogIndex == dogArray.length - 1 ? "hidden" : ""} `} name="next" ><img src={arrowRight} alt="next" height="30px" /></button>
                <button onClick={handleClick} className={`btn btn-prev ${dogIndex == 0 ? "hidden" : ""} `} name="previous"><img src={arrowLeft} alt="previous" height="30px" /></button>
                <button onClick={handleClick} className="btn btn-to-form" name="to-form">{dog.comesFrom == 'API' ? "Store in Data Base" : "Modify"}</button>
                <button onClick={handleClick} className="btn btn-fav" name="fav">{dog.favorite == true ? "Delete from favorites" : "Add to favorites"}</button>
                {dog.comesFrom === 'DB' && <button onClick={handleClick} className="btn btn-delete" name="delete-dog">Delete Dog</button>}

                <span className="store-text">stored in: {dog.comesFrom === 'API' ? "external API" : "Data Base"}</span>


                <div className="dog-info">
                    <img src={dog.image.url} alt="dog-image" className="dog-image" />
                    <div className="dog-text">
                        {dog.name?.length > 0 && <h1>Breed name: {dog.name}</h1>}
                        {dog.bred_for?.length > 0 && <h2>Talents: {dog.bred_for}</h2>}
                        {dog.breed_group?.length > 0 && <h2>Belongs to "{dog.breed_group}" dog group</h2>}
                        {dog.life_span?.length > 0 && <h2>Life Span: {dog.life_span}</h2>}
                        {dog.origin?.length > 0 && <h2>Country of Origin: {dog.origin}</h2>}
                        {dog.weight?.imperial?.length > 0 && <h2>Weight: {dog.weight.imperial} lbs</h2>}
                        {dog.height?.imperial?.length > 0 && <h2>Height (to shoulders): {dog.height.imperial} inches </h2>}
                        {dog.temperament?.length > 0 && <h3>Temperaments: {dog.temperament}</h3>}
                    </div>
                </div>

            </div>
        </div>
    )
};

export default DogDetail;
