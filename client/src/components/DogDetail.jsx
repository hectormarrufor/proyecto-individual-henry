import { useSelector } from "react-redux";
import arrowLeft from '../assets/arrow-left.png';
import arrowRight from '../assets/arrow-right.png';
import './DogDetail.css'

const DogDetail = ({ setActiveID, id, dogArray }) => {
    console.log(id)

    // const { dogs } = useSelector(state => state.dogReducer)


    const dog = dogArray.find(x => x.id == id);
    let url = dog.reference_image_id


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
                dogIndex < dogArray.length-1 &&  dogIndex++;
                setActiveID(dogArray[dogIndex].id);

                break;
            case "previous":
                dogIndex > 0 && dogIndex--;
                setActiveID(dogArray[dogIndex].id);

                break;
        }
    }

    return (
        <div className="dog-detail">
            <div className="card">
                <button onClick={handleClick} className="btn btn-close" name="close">{'<<volver'}</button>
                <button onClick={handleClick} className={`btn btn-next ${dogIndex == dogArray.length-1 ? "hidden" : ""} `} name="next" ><img src={arrowRight} alt="next" height="30px" /></button>
                <button onClick={handleClick} className={`btn btn-prev ${dogIndex == 0 ? "hidden" : ""} `} name="previous"><img src={arrowLeft} alt="previous" height="30px" /></button>

                <div className="dog-info">
                    <img src={`https://cdn2.thedogapi.com/images/${url}.jpg`} alt="dog-image"className="dog-image" />
                    <div className="dog-text">
                        {dog.name?.length > 0 && <h1>Breed name: {dog.name}</h1>}
                        {dog.bred_for?.length > 0 && <h2>Talents: {dog.bred_for}</h2>}
                        {dog.breed_group?.length > 0 && <h2>Belongs to "{dog.breed_group}" dog group</h2>}
                        {dog.life_span?.length > 0 && <h2>Life Span: {dog.life_span}</h2>}
                        {dog.origin?.length > 0 && <h2>Country of Origin: {dog.origin}</h2>}
                        {dog.weight?.length > 0 && <h2>Weight: {dog.weight.imperial} lbs</h2>}
                        {dog.height?.length > 0 && <h2>Height (to shoulders): {dog.height.imperial} inches </h2>}
                        {dog.temperament?.length > 0 && <h3>Temperaments: {dog.temperament}</h3>}
                    </div>
                </div>

            </div>
        </div>
    )
};

export default DogDetail;
