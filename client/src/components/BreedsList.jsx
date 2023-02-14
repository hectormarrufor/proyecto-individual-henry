import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchDogsFromDB from "../helpers/fetchDogsFromDB";
import { insert , insert_replacing } from "../redux/slices/dogSlice";
import fetchPerros from "../redux/thunks/fetchDogs";
import BreedCard from "./BreedCard";
import './BreedList.css'
import DogDetail from "./DogDetail";
import SideBar from "./SideBar";


const BreedsList = ({input, click}) => {

    
    const { dogs, weights, heights } = useSelector(state => state.dogReducer);
    const [temperaments, setTemperaments] = useState([]);
    const [weightChoices, setWeightChoices] = useState([]);
    const [heightChoices, setHeightChoices] = useState([]);
    const [sort, setSort] = useState('breed');
    const [activeID, setActiveID] = useState(undefined);
    const [storedAtChoice, setStoredAtChoice] = useState({DB: false, API: false});
    const [favorited, setFavorited] = useState(false);
    let perrosAPI;
    
        const dispatch = useDispatch();
        useEffect(() => {
            (async function () {
                if (dogs.length === 0) {
                    perrosAPI = await fetchPerros();
                    dispatch(insert(perrosAPI));
                    
                }
                await fetchDogsFromDB(dispatch, insert_replacing);
    
            })();
        }, []);

    // const [filter, setFilter] = useState([...dogs])
   



    let count = 0;
    let raw = [...dogs]
    let filter = [...dogs];
    // console.log(filter)
    filter = filter.filter(x => x.name?.toLowerCase().includes(input.toLowerCase()));
    raw = [...filter];

    temperaments?.forEach(element => {

        if (element.isActive === true) {
            count++;
            if (count === 1) {filter = filter.filter(dog => dog.temperament?.includes(element.temperament));
            }
            
            else {
                filter = filter.concat(raw.filter(dog => dog.temperament?.includes(element.temperament) && !filter.includes(dog)));
            }
        }

    });
    count = 0;
    raw = [...filter];
    weightChoices?.forEach(element => {
        if (element.isActive){
            count++;
            if(count === 1){
                filter = filter.filter(dog => dog.weight.imperial.split(' - ')[1] > weights[`${element.value}`][0] && dog.weight.imperial.split(' - ')[1] < weights[`${element.value}`][1])
            }
            else {
                filter = filter.concat(raw.filter(dog => dog.weight.imperial.split(' - ')[1] > weights[`${element.value}`][0] && dog.weight.imperial.split(' - ')[1] < weights[`${element.value}`][1]))
            }
        }
    })
    

    count =0;
    raw = [...filter];
    
    heightChoices?.forEach(element => {
        if (element.isActive){
            count++;
            if(count === 1){
                filter = filter.filter(dog => dog.height.imperial.split(' - ')[1] > heights[`${element.value}`][0] && dog.height.imperial.split(' - ')[1] < heights[`${element.value}`][1])
            }
            else {
                filter = filter.concat(raw.filter(dog => dog.height.imperial.split(' - ')[1] > heights[`${element.value}`][0] && dog.height.imperial.split(' - ')[1] < heights[`${element.value}`][1]))
            }
        }
    });

    count = 0;
    raw = [...filter];
    Object.keys(storedAtChoice).forEach(key => {
        if (storedAtChoice[key] === true) {
            count++;
            if(count === 1) filter = filter.filter(dog => dog.comesFrom === key);
            else filter = filter.concat(raw.filter(dog => dog.comesFrom === key));
        }
    })

    raw = [...filter];
    if (favorited === true){

        filter = filter.filter(dog => dog.favorite&&dog.favorite === true)

    }


    if (sort === 'breed'){
        filter.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    }
    else if(sort === 'weight'){
        
        filter.sort((a, b) => (parseFloat((a.weight.imperial.split(' - ')[1]) ? a.weight.imperial.split(' - ')[1] : a.weight.imperial) > parseFloat((b.weight.imperial.split(' - ')[1]) ? b.weight.imperial.split(' - ')[1] : b.weight.imperial)) ? 1 : ((parseFloat((b.weight.imperial.split(' - ')[1]) ? b.weight.imperial.split(' - ')[1] : b.weight.imperial) > parseFloat((a.weight.imperial.split(' - ')[1]) ? a.weight.imperial.split(' - ')[1] : a.weight.imperial)) ? -1 : 0));
    }
    else if(sort === 'height'){
        filter.sort((a, b) => (parseFloat((a.height.imperial.split(' - ')[1]) ? a.height.imperial.split(' - ')[1] : a.height.imperial) > parseFloat((b.height.imperial.split(' - ')[1]) ? b.height.imperial.split(' - ')[1] : b.height.imperial)) ? 1 : ((parseFloat((b.height.imperial.split(' - ')[1]) ? b.height.imperial.split(' - ')[1] : b.height.imperial) > parseFloat((a.height.imperial.split(' - ')[1]) ? a.height.imperial.split(' - ')[1] : a.height.imperial)) ? -1 : 0));
    }

    const handleClick = (e) => {
        if (activeID && e.target.className !== 'dog-detail' ) {
            if (e.target.closest('div.dog-detail')){
                
            }
            else setActiveID(undefined)
         }
    }

    raw = [...filter];
    const totalPages = Math.ceil(raw.length /8);
    const [actualPage, setActualPage] = useState(1)
    let indexPagination = 8*(actualPage)-8
    filter = raw.slice(indexPagination, indexPagination+8);

    useEffect(() => {
      setActualPage(1);

    }, [temperaments, favorited, heightChoices, weightChoices, sort, input, storedAtChoice])
    
     
    const handlePage = (e) => {
        if (e.target.name === 'next-page') {
            setActualPage(actualPage+1);
           
        }
        else if (e.target.name === 'previous-page') {
            setActualPage(actualPage-1);

        }
    }
    const [popup, setPopup] = useState(undefined)
    const popupMessage = () => {
        console.log('entring in popup function');
        setPopup('Dog successfully deleted')
        setTimeout(() => {
            setPopup(undefined)
        }, 5000);
    }

    return (
        
        <div className="content" onClick={handleClick}>
            {popup && <h4 className="popup">{popup}</h4>}
            {activeID !== undefined ? <DogDetail setActiveID ={setActiveID} id= {activeID} dogArray = {filter} popupMessage = {popupMessage}/> : null}
            {dogs.length > 0 &&
                <div className="list-wrapper">
                    <div className="filter">
                        {dogs.length > 0 && <SideBar temperaments={temperaments} setTemperaments={setTemperaments} weightChoices={weightChoices} setWeightChoices={setWeightChoices} heightChoices={heightChoices} setHeightChoices={setHeightChoices} setSort ={setSort} storedAtChoice ={storedAtChoice} setStoredAtChoice={setStoredAtChoice} favorited={favorited} setFavorited={setFavorited} click = {click} perrosAPI={perrosAPI}/>}
                    </div>
                    <div className="list-controller">
                        <div className="list">
                            {/* {console.log(filter)} */}
                            {filter?.map((x) => <BreedCard {...x} key={x.id} setActiveID ={setActiveID}/>)}
                        </div>
                        <div className={totalPages === 0 ? 'hidden' : "page-controller"}>
                            <button className={actualPage === 1 ? "hidden" : "page-controller-item  btn-previous"} onClick={handlePage} name='previous-page'>🡰</button>
                            <p className="page-controller-item">
                                {actualPage} de {totalPages} paginas
                            </p>
                            <button  className={actualPage === totalPages ? "hidden" : "page-controller-item  btn-nextt"} onClick={handlePage} name='next-page'>🡲</button>
                        </div>
                    </div>
                </div>

            }

        </div>
    )
};

export default BreedsList;
