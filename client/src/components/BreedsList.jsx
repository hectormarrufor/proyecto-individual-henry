import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTemperamentsOnStore } from "../redux/slices/dogSlice";
import BreedCard from "./BreedCard";
import './BreedList.css'
import DogDetail from "./DogDetail";
import SideBar from "./SideBar";

const BreedsList = () => {

    
    const { dogs, weights, heights } = useSelector(state => state.dogReducer);
    const [temperaments, setTemperaments] = useState([]);
    const [weightChoices, setWeightChoices] = useState([]);
    const [heightChoices, setHeightChoices] = useState([]);
    const [sort, setSort] = useState('breed');
    const [activeID, setActiveID] = useState(undefined);

    // const [filter, setFilter] = useState([...dogs])
   



    let count = 0;
    let raw = [...dogs]
    let filter = [...dogs];
    // console.log(filter)

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
    })


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
        if (activeID && e.target.className != 'dog-detail' ) {
            if (e.target.closest('div.dog-detail')){
                
            }
            else setActiveID(undefined)
         }
    }

   
     

    return (
        
        <div className="content" onClick={handleClick}>
            {activeID != undefined ? <DogDetail setActiveID ={setActiveID} id= {activeID} dogArray = {filter}/> : null}
            {dogs.length > 0 &&
                <div className="list-wrapper">
                    <div className="filter">
                        {dogs.length > 0 && <SideBar temperaments={temperaments} setTemperaments={setTemperaments} weightChoices={weightChoices} setWeightChoices={setWeightChoices} heightChoices={heightChoices} setHeightChoices={setHeightChoices} setSort ={setSort}/>}
                    </div>
                    <div className="list">
                        {/* {console.log(filter)} */}
                        {filter?.map((x, index) => <BreedCard {...x} key={x.id} setActiveID ={setActiveID}/>)}
                    </div>
                </div>

            }

        </div>
    )
};

export default BreedsList;
