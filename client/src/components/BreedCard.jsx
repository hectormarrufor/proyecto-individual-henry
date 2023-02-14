import card_image from '../assets/main_logo.png'
import zelda_heart from '../assets/zelda-heart.png'
import zelda_heart_empty from '../assets/zelda-heart-empty.png'
import axios from 'axios';
import fetchDogsFromDB from '../helpers/fetchDogsFromDB';
import { insert_replacing } from '../redux/slices/dogSlice';
import { useDispatch } from 'react-redux';



const BreedCard = ({ bred_for, breed_group, life_span, temperament, id, name, height, weight, image, setActiveID, comesFrom, favorite, origin}) => {
    const dispatch = useDispatch();

    const handleClick = (e) => {
        if (e.target.className === 'heart') { }
        else if (e.target.localName === 'div') {
            setActiveID(parseInt(e.target.id))
        }
        else {
            setActiveID(parseInt(e.target.parentElement.id))
        }


        //e.target.parentElement.id
    }

    const addRemoveFav = async (e) => {
        
        if (comesFrom === 'API') {
            await axios.post('http://localhost:3001/dogs/create', {
                name,
                weight: { imperial: weight.imperial, metric: weight.metric },
                height:     { imperial: height.imperial, metric: height.metric },
                bred_for,
                breed_group,
                life_span,
                temperament,
                origin,
                image_url: image.url,
                comesFrom: 'DB',
                id,
                favorite: true
            })
                .then(console.log('updated')).catch(err => console.log(err.message))
        } else if (favorite === false) {
                await  axios.post('http://localhost:3001/dogs/update', {
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
            } else {
            await  axios.post('http://localhost:3001/dogs/update', {
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
                favorite: false
            })
                .then(console.log('updated')).catch(err => console.log(err.message))
        }

        fetchDogsFromDB(dispatch, insert_replacing);
    }

    const handleError = (e) => {
        e.target.src = card_image
    }
    return (
        <div className="card breed-card focusable" onClick={handleClick} id={id}>
            {favorite ? <img src={zelda_heart} className='heart' onClick={addRemoveFav} /> : <img src={zelda_heart_empty} className='heart' onClick={addRemoveFav} />}
            <img src={image.url} onError={handleError} alt="not found" className='dog-card-img' />
            <h2>{name}</h2>
            {comesFrom === 'DB' && <span className='span-saved'>saved in database</span>}


        </div>
    )
};

export default BreedCard;
