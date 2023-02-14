import './SideBar.css'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react';
import TemperamentFilter from './TemperamentFilter';
import HeightFilter from './HeightFilter';
import WeightFilter from './WeightFilter';
import { useRef } from 'react';
import { setTemperamentsOnStore } from '../redux/slices/dogSlice';
import arrow_down from '../assets/arrow-down.png'

let i = 0;

const SideBar = ({ temperaments, setTemperaments, weightChoices, setWeightChoices, heightChoices, setHeightChoices, setSort, storedAtChoice, setStoredAtChoice, favorited, setFavorited, click, perrosAPI }) => {

    const dispatch = useDispatch();

    const { dogs, heights, weights } = useSelector(state => state.dogReducer);
    // const [temperaments, setTemperaments] = useState([]);
    // const [weightChoices, setWeightChoices] = useState([]);
    // const [heightChoices, setHeightChoices] = useState([]);


    useEffect(() => {

        i++;
        setTemperaments([]);
        let temperamentsArray = [];
        let weightArray = [];
        let heightArray = [];



        //ITERATE OVER EVERY SEARCHED DOG, TO CALCULATE FILTER PARAMETERS!
        dogs?.forEach(dog => {

            //SEARCHED DOGS TEMPERAMENT MAP IN SIDEBAR
            if (dog.temperament) {
                if (dog.temperament.includes(',')) {
                    let arrayTemperament = dog.temperament.split(', ');

                    arrayTemperament.forEach(value => {
                        let count = 0;
                        // console.log(temperamentsArray);
                        if (temperamentsArray.length > 0) {
                            temperamentsArray.forEach(temperament => {
                                if (temperament === value) count++;
                            })
                            if (count === 0) temperamentsArray.push(value);
                        }
                        else {
                            temperamentsArray.push(value)
                        }


                    });
                }

                else {
                    let count = 0;
                    temperamentsArray.forEach(temperament => {

                        if (temperament === dog.temperament) count++;
                    });
                    if (count === 0) temperamentsArray.push(dog.temperament);

                }
            }

            //SEARCHED DOGS WEIGHT CALCULATIONS, MINIMUM AND MAXIMUM
            if (dog.weight.imperial.includes(' - ')) {
                let actualWeight = dog.weight.imperial.split(' - ')[1];
                if (weightArray.includes(actualWeight)) { } else weightArray.push(actualWeight);
            } else {
                let actualWeight = dog.weight.imperial;
                if (weightArray.includes(actualWeight)) { } else weightArray.push(actualWeight);
            }

            //SEARCHED DOGS HEIGHTS CALCULATIONS, MINIMUM AND MAXIMUM
            if (dog.height.imperial.includes(' - ')) {
                let actualHeight = dog.height.imperial.split(' - ')[1];
                if (heightArray.includes(actualHeight)) { } else heightArray.push(actualHeight);
            } else {
                let actualHeight = dog.height.imperial;
                if (heightArray.includes(actualHeight)) { } else heightArray.push(actualHeight);

            }
        }
        );


        //FUNCTION TO SORT NUMBERS FROM MINOR TO MAYOR
        const compare = (a, b) => {
            return a - b;
        }

        weightArray = weightArray.map(x => parseFloat(x))
        weightArray.sort(compare);
        weightArray.splice(1, weightArray.length - 2);

        // setWeight({ minimum: weightArray[0], maximum: weightArray[1] });




        heightArray = heightArray.map(x => parseFloat(x));
        heightArray.sort(compare);
        heightArray.splice(1, heightArray.length - 2);

        // setHeight({ minimum: heightArray[0], maximum: heightArray[1] })


        temperamentsArray.sort()
        i === 1 && dispatch(setTemperamentsOnStore(temperamentsArray));
        // axios.post('http://localhost:3001/temperaments/setTemperaments/', temperamentsArray);

        temperamentsArray = temperamentsArray.map(x => { return ({ temperament: x, isActive: false }) });

        setTemperaments(temperamentsArray);

        //FILTER WEIGHT OPTIONS:
        weightArray[0] < weights.light[1] ?
            weightArray[1] > weights.light[1] ?
                weightArray[1] > weights.medium[1] ?
                    setWeightChoices([{ value: 'light', isActive: false }, { value: 'medium', isActive: false }, { value: 'heavy', isActive: false }])
                    :
                    setWeightChoices([{ value: 'light', isActive: false }, { value: 'medium', isActive: false }])
                :
                setWeightChoices([{ value: 'light', isActive: false }])
            :
            weightArray[0] < weights.medium[1] ?
                weightArray[1] > weights.medium[1] ?
                    setWeightChoices([{ value: 'medium', isActive: false }, { value: 'heavy', isActive: false }])
                    :
                    setWeightChoices([{ value: 'medium', isActive: false }])
                :
                setWeightChoices([{ value: 'heavy', isActive: false }])



        //FILTER HEIGHT OPTIONS


        heightArray[0] < heights.small[1] ?
            heightArray[1] > heights.small[1] ?
                heightArray[1] > heights.average[1] ?
                    setHeightChoices([{ value: 'small', isActive: false }, { value: 'average', isActive: false }, { value: 'tall', isActive: false }])
                    :
                    setHeightChoices([{ value: 'small', isActive: false }, { value: 'average', isActive: false }])
                :
                setHeightChoices([{ value: 'small', isActive: false }])
            :
            heightArray[0] < heights.average[1] ?
                heightArray[1] > heights.average[1] ?
                    setHeightChoices([{ value: 'average', isActive: false }, { value: 'tall', isActive: false }])
                    :
                    setHeightChoices([{ value: 'average', isActive: false }])
                :
                setHeightChoices([{ value: 'tall', isActive: false }])
    }, [perrosAPI])
    const handleChange = (e) => {
        setSort(e.target.value)
    }

    const temperament = useRef(null)
    const showHideTemperaments = (e) => {
        // e.preventDefault();
        if (e.target.checked === false ) {
            temperament.current.className = 'hidden';
            i++;
            setTemperaments([...temperaments].map(temp => {return {isActive: false, temperament: temp.temperament}}));
    }
        else if (e.target.checked === true) temperament.current.className = 'temperament-container card'
        
    }

    const closeTemperaments = () => {
        temperament.current.className = 'hidden'
    }
    return (
        <div className="sidebar">
            <div className='sort-component sidebar-item'>
                <label htmlFor="hola"><h3>Sort by:</h3></label>
                <select name="hola" id="hol" onChange={handleChange}>
                    <option value="breed">Breed</option>
                    <option value="weight">Weight</option>
                    <option value="height">Max height</option>
                </select>
            </div>
            <hr />
            <div className='filter-component sidebar-item'>
                <h3>Filter by:</h3>
                <div className='temperament-selection sidebar-item'>
                    <input type='checkbox' className='sidebar-item' onChange={showHideTemperaments} value="Temperaments" name='temperaments' checked = {temperaments.find(x => x.isActive) ? 'checked' : ''}/>
                    <label htmlFor="temperaments" style={{cursor: 'pointer'}} onClick = {() => (temperament.current.className === 'temperament-container card') ?temperament.current.className = 'hidden' :temperament.current.className = 'temperament-container card'}>Temperaments <img src={arrow_down} height='10px'/></label>
                    <div className="hidden" ref={temperament}>
                        {temperaments?.map(temperament => {
                            return (
                                <TemperamentFilter className='temperament-container-item' key={temperament.temperament + i} {...temperament} setTemperaments={setTemperaments} temperaments={temperaments} />
                            )
                        })}
                    <button className='btn btn-primary cornered' onClick={closeTemperaments}>Done</button>
                    </div>

                </div>
                <div className="weight-selection sidebar-item">
                    <h4 className="sidebar-item">Weight:</h4>
                    {weightChoices.map(weight => {
                        return (
                            <WeightFilter key={weight.value + i} value={weight.value} setWeightChoices={setWeightChoices} weightChoices={weightChoices} />
                        )
                    })}




                </div>
                <div className="height-selection sidebar-item">
                    <h4 className="sidebar-item">Height:</h4>
                    {heightChoices.map(height => {
                        return (
                            <HeightFilter key={height.value + i} value={height.value} setHeightChoices={setHeightChoices} heightChoices={heightChoices} />
                        )
                    })}


                </div>
                <div className="comesFrom-selection sidebar-item">
                    <h4 className="sidebar-item">Stored at:</h4>
                    <div className='filter-item'>
                        <input type="checkbox" name="API" onChange={(e) => setStoredAtChoice ({...storedAtChoice, [`${e.target.name}`]: e.target.checked})} />
                        <label htmlFor="API">External API</label>
                    </div>
                    <div className='filter-item'>
                        <input type="checkbox" name="DB" onChange={(e) => setStoredAtChoice  ({...storedAtChoice, [`${e.target.name}`]: e.target.checked})} />
                        <label htmlFor="DB">Internal Database</label>
                    </div>
                    


                </div>
                <div className="favorite-selection sidebar-item">
                    <h4 className="sidebar-item">Favorites:</h4>
                    <div className='filter-item'>
                        <input type="checkbox" name="fav" onChange={(e) => setFavorited (e.target.checked)} />
                        <label htmlFor="fav">Show only favorited</label>
                    </div>
                   
                    


                </div>
            </div>
        </div>
    )
};

export default SideBar;
