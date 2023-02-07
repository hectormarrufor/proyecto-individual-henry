import card_image from '../assets/main_logo.png'


const BreedCard = ({ bred_for , id , name, height,weight, reference_image_id, setActiveID}) => {
    const image_url = `https://cdn2.thedogapi.com/images/${reference_image_id}.jpg`;

    const handleClick = (e) => {
        if (e.target.localName === 'div'){
            setActiveID(parseInt(e.target.id))
        }
        else {
            setActiveID(parseInt(e.target.parentElement.id))
        }


        //e.target.parentElement.id
    }

    const handleError = (e) => {
        e.target.src = card_image
    }
    return (
        <div className="card breed-card focusable" onClick={handleClick} id ={id}>
            <img src= {image_url} onError ={handleError} alt="no picture on API"/>
            <h2>{name}</h2>

        </div>
    )
};

export default BreedCard;
