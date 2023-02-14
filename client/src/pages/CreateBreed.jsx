import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import './CreateBreed.css'
import axios from 'axios';
import { useEffect } from "react";
import fetchPerros from "../redux/thunks/fetchDogs";
import { insert, insert_replacing } from "../redux/slices/dogSlice";
import { useLocation, useNavigate } from "react-router-dom";
import fetchDogsFromDB from "../helpers/fetchDogsFromDB";


const CreateBreed = () => {
    const [errors, setErrors] = useState({
        nameError: false,
        bredForError: false,
        unitError: {
            heightImperialMinimum: false,
            heightImperialMaximum: false,
            heightMetricMinimum: false,
            heightMetricMaximum: false,
            weightImperialMinimum: false,
            weightImperialMaximum: false,
            weightMetricMinimum: false,
            weightMetricMaximum: false,
        }
    })
    const navigate = useNavigate();
    const location = useLocation().state;

    const { dogs } = useSelector(state => state.dogReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        (async function () {
            if (dogs.length === 0) {
                let perrosAPI = await fetchPerros();
                dispatch(insert(perrosAPI));

            }
            fetchDogsFromDB(dispatch, insert_replacing);
        })();


    }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/temperaments')
            .then(data => setTemperaments(data.data));

    }, []);



    //BUSCANDO UN ID DISPONIBLE PARA ASIGNAR A UNA NUEVA RAZA
    let index;
    let count = 0;
    dogs?.forEach(dog => {
        count++;
        if (dog.id !== count) {
            index = dog.id;

        }
    });

    const [temperaments, setTemperaments] = useState([])

    let freeId = 0;
    let counter = 0;
    for (let dog of dogs) {
        counter++
        if (dog.id != counter) {
            freeId = counter;
            break;
        }
    }
    if (freeId === 0) freeId = dogs.length;

    const initialState = {
        name: '',
        weight: {
            imperial: '',
            metric: '',
        },
        height: {
            imperial: '',
            metric: '',
        },
        bred_for: '',
        breed_group: '',
        life_span: '',
        temperament: [],
        origin: '',
        image_url: '',
        comesFrom: '',
        favorite: false,
        id: freeId
    };
    const [dogInfo, setDogInfo] = useState(location ?

        {
            name: location.name,
            weight: {
                imperial: location.weight.imperial,
                metric: location.weight.metric,
            },
            height: {
                imperial: location.height.imperial,
                metric: location.height.metric,
            },
            bred_for: location.bred_for,
            breed_group: location.breed_group,
            life_span: location.life_span,
            temperament: location.temperament.split(', '),
            origin: location.origin,
            image_url: location.image.url,
            comesFrom: 'DB',
            id: location.id,
            favorite: location.favorite
        }

        :

        initialState
    )
    let { name, weight, height, bred_for, breed_group, life_span, temperament, origin, image_url, comesFrom, id, favorite } = dogInfo;


    //Form Control:

    const handleForm = (e) => {
        switch (e.target.name) {
            case 'breed':
                setDogInfo({ ...dogInfo, name: e.target.value });
                console.log(e.target.value);
                if (/^[\sa-zA-Z]*$/.test(e.target.value.toString())) {
                    console.log('ok');
                    setErrors({ ...errors, nameError: false });
                }
                else {
                    setErrors({ ...errors, nameError: true })
                    console.log('error');
                };

                break;
            case 'height-metric-minimum':
                setDogInfo({ ...dogInfo, height: { ...height, metric: e.target.value + ' - ' + dogInfo.height.metric.split(' - ')[1] } });
                if (Number.isNaN(Number(e.target.value))) {
                    setErrors({ ...errors, unitError: { ...errors.unitError, heightMetricMinimum: true } });
                } else setErrors({ ...errors, unitError: { ...errors.unitError, heightMetricMinimum: false } })
                break;
            case 'height-metric-maximum':
                setDogInfo({ ...dogInfo, height: { ...height, metric: dogInfo.height.metric.split(' - ')[0] + ' - ' + e.target.value } });
                if (Number.isNaN(Number(e.target.value))) {
                    setErrors({ ...errors, unitError: { ...errors.unitError, heightMetricMaximum: true } });
                } else setErrors({ ...errors, unitError: { ...errors.unitError, heightMetricMaximum: false } })
                break;
            case 'height-imperial-minimum':
                setDogInfo({ ...dogInfo, height: { ...height, imperial: e.target.value + ' - ' + dogInfo.height.imperial.split(' - ')[1] } });
                if (Number.isNaN(Number(e.target.value))) {
                    setErrors({ ...errors, unitError: { ...errors.unitError, heightImperialMinimum: true } });
                } else setErrors({ ...errors, unitError: { ...errors.unitError, heightImperialMinimum: false } })
                break;
            case 'height-imperial-maximum':
                setDogInfo({ ...dogInfo, height: { ...height, imperial: dogInfo.height.imperial.split(' - ')[0] + ' - ' + e.target.value } });
                if (Number.isNaN(Number(e.target.value))) {
                    setErrors({ ...errors, unitError: { ...errors.unitError, heightImperialMaximum: true } });
                } else setErrors({ ...errors, unitError: { ...errors.unitError, heightImperialMaximum: false } })
                break;
            case 'weight-metric-minimum':
                setDogInfo({ ...dogInfo, weight: { ...weight, metric: e.target.value + ' - ' + dogInfo.weight.metric.split(' - ')[1] } });
                if (Number.isNaN(Number(e.target.value))) {
                    setErrors({ ...errors, unitError: { ...errors.unitError, weightMetricMinimum: true } });
                } else setErrors({ ...errors, unitError: { ...errors.unitError, weightMetricMinimum: false } })
                break;
            case 'weight-metric-maximum':
                setDogInfo({ ...dogInfo, weight: { ...weight, metric: dogInfo.weight.metric.split(' - ')[0] + ' - ' + e.target.value } });
                if (Number.isNaN(Number(e.target.value))) {
                    setErrors({ ...errors, unitError: { ...errors.unitError, weightMetricMaximum: true } });
                } else setErrors({ ...errors, unitError: { ...errors.unitError, weightMetricMaximum: false } })
                break;
            case 'weight-imperial-minimum':
                setDogInfo({ ...dogInfo, weight: { ...weight, imperial: e.target.value + ' - ' + dogInfo.weight.imperial.split(' - ')[1] } });
                if (Number.isNaN(Number(e.target.value))) {
                    setErrors({ ...errors, unitError: { ...errors.unitError, weightImperialMinimum: true } });
                } else setErrors({ ...errors, unitError: { ...errors.unitError, weightImperialMinimum: false } })
                break;
            case 'weight-imperial-maximum':
                setDogInfo({ ...dogInfo, weight: { ...weight, imperial: dogInfo.weight.imperial.split(' - ')[0] + ' - ' + e.target.value } });
                if (Number.isNaN(Number(e.target.value))) {
                    setErrors({ ...errors, unitError: { ...errors.unitError, weightImperialMaximum: true } });
                } else setErrors({ ...errors, unitError: { ...errors.unitError, weightImperialMaximum: false } })
                break;
            case 'bred_for':
                setDogInfo({ ...dogInfo, bred_for: e.target.value });
                if (/\d/.test(e.target.value)) {
                    console.log('error');
                    setErrors({ ...errors, bredForError: true });
                }
                else setErrors({ ...errors, bredForError: false });
                break;
            case 'breed_group':
                setDogInfo({ ...dogInfo, breed_group: e.target.value });
                break;
            case 'origin':
                setDogInfo({ ...dogInfo, origin: e.target.value });
                break;
            case 'image':
                setDogInfo({ ...dogInfo, image_url: e.target.value });
                break;
            case 'life_span':
                setDogInfo({ ...dogInfo, life_span: e.target.value });
                break;
            case 'favorite':
                setDogInfo({ ...dogInfo, favorite: e.target.value });

                break;

            default:
                console.log('elemento no controlado');
                break;

        }
    }

    const handleCheckbox = (e) => {
        let newArray = [...dogInfo.temperament];
        e.target.checked ? newArray.push(e.target.value) : newArray.splice(newArray.findIndex(x => x === e.target.value), 1)
        setDogInfo({ ...dogInfo, temperament: newArray });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, weight, height, bred_for, breed_group, life_span, temperament, origin);
        let selected = dogs.find(x => x.id === id);
        if (selected?.comesFrom == 'DB') {
            axios.post('http://localhost:3001/dogs/update', {
                name,
                weight,
                height,
                bred_for,
                breed_group,
                life_span,
                temperament,
                origin,
                image_url,
                comesFrom: 'DB',
                id,
                favorite
            })
                .then(console.log('updated')).catch(err => console.log(err.message))

            navigate('/home');
        }
        else {
            axios.post('http://localhost:3001/dogs/create', {
                name,
                weight,
                height,
                bred_for,
                breed_group,
                life_span,
                temperament,
                origin,
                image_url,
                comesFrom: 'DB',
                id,
                favorite
            }).then(console.log('created')).catch(err => console.log(err.message))

            navigate('/home');
            // window.location.reload(false);
        }

    }


    const handleNameChoose = (e) => {
        e.preventDefault();
        let selected = dogs.find(x => x.name === e.target.innerHTML);
        Object.keys(selected).forEach(property => {
            if (selected[property] === undefined) selected[property] = '';
        })
        let { name, weight, height, bred_for, breed_group, life_span, temperament, origin, image, id, country_code, comesFrom } = selected;
        // if (!image_url && reference_image_id) image_url = 'https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg'
        if (!origin && country_code) origin = country_code;
        setDogInfo({
            ...dogInfo, name, bred_for, breed_group, life_span, origin, image_url: image.url, comesFrom, id, temperament: temperament.split(', '),
            height: { ...height, imperial: selected.height.imperial, metric: selected.height.metric },
            weight: { ...weight, imperial: selected.weight.imperial, metric: selected.weight.metric },

        });

    }
    let filter = dogs.filter(x => x.name?.toLowerCase().includes(name?.toLowerCase()))

    return (
        <>
            <div className="content-wrapper ">
                <NavBar renderedFrom='form' />
                <div className="content">
                    <div className="card form-window">

                        <h2>{dogInfo.comesFrom === 'DB' && dogInfo.name === filter[0]?.name ? "Update Breed" : "Create Breed on Database"}</h2>
                        <form action="post" onSubmit={handleSubmit} className='form card'>
                            <div className="flex-up">
                                <div className="flex-left">
                                    <div className="form-group ">
                                        <label htmlFor="breed">Breed name: </label>
                                        <input className="input-group" type="text" onChange={handleForm} name="breed" value={name} autoComplete='off' />
                                        {name && filter[0]?.name != undefined && <div className={filter[0]?.name === name ? "hidden" : "results"}>
                                            {filter?.map(x => <button onClick={handleNameChoose}>{x.name}</button>)}
                                        </div>}
                                    </div>
                                        {errors.nameError && <h4 className="error">Name must be only alphabetical</h4>}

                                    <div className="form-group ">
                                        <label>Height:   </label>

                                        <div className="form-group card">
                                            <label htmlFor="height-metric">Metric:</label>
                                            <div className="height-metric" name="height-metric">
                                                <div className="height-metric-minimum">
                                                    <label htmlFor="height-metric-minimum">Minimum:</label>
                                                    <input className="input-group" type="text" onChange={handleForm} name="height-metric-minimum" value={height.metric.split(' - ')[0]} />
                                                    {errors.unitError.heightMetricMinimum && <h4 className="error">Must be a number</h4>}

                                                </div>
                                                <div className="height-metric-maximum">
                                                    <label htmlFor="height-metric-maximum">Maximum:</label>
                                                    <input className="input-group" type="text" onChange={handleForm} name="height-metric-maximum" value={height.metric.split(' - ')[1]} />
                                                    {errors.unitError.heightMetricMaximum && <h4 className="error">Must be a number</h4>}

                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group card">
                                            <label htmlFor="imperial">Imperial:</label>
                                            <div className="imperial" name="imperial">
                                                <div className="imperial-minimum">
                                                    <label htmlFor="height-imperial-minimum">Minimum:</label>
                                                    <input className="input-group" type="text" onChange={handleForm} name="height-imperial-minimum" value={height.imperial.split(' - ')[0]} />
                                                    {errors.unitError.heightImperialMinimum && <h4 className="error">Must be a number</h4>}

                                                </div>
                                                <div className="imperial-maximum">
                                                    <label htmlFor="height-imperial">Maximum:</label>
                                                    <input className="input-group" type="text" onChange={handleForm} name="height-imperial-maximum" value={height.imperial.split(' - ')[1]} />
                                                    {errors.unitError.heightImperialMaximum && <h4 className="error">Must be a number</h4>}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group ">
                                        <label>Weight:   </label>

                                        <div className="form-group card">
                                            <label htmlFor="weight-metric">Metric:</label>
                                            <div className="weight-metric" name="weight-metric">
                                                <div className="weight-metric-minimum">
                                                    <label htmlFor="weight-metric-minimum">Minimum:</label>
                                                    <input className="input-group" type="text" onChange={handleForm} name="weight-metric-minimum" value={weight.metric.split(' - ')[0]} />
                                                    {errors.unitError.weightMetricMinimum && <h4 className="error">Must be a number</h4>}

                                                </div>
                                                <div className="weight-metric-maximum">
                                                    <label htmlFor="weight-metric-maximum">Maximum:</label>
                                                    <input className="input-group" type="text" onChange={handleForm} name="weight-metric-maximum" value={weight.metric.split(' - ')[1]} />
                                                    {errors.unitError.weightMetricMaximum && <h4 className="error">Must be a number</h4>}

                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group card">
                                            <label htmlFor="imperial">Imperial:</label>
                                            <div className="imperial" name="imperial">
                                                <div className="imperial-minimum">
                                                    <label htmlFor="weight-imperial-minimum">Minimum:</label>
                                                    <input className="input-group" type="text" onChange={handleForm} name="weight-imperial-minimum" value={weight.imperial.split(' - ')[0]} />
                                                    {errors.unitError.weightImperialMinimum && <h4 className="error">Must be a number</h4>}

                                                </div>
                                                <div className="imperial-maximum">
                                                    <label htmlFor="weight-imperial">Maximum:</label>
                                                    <input className="input-group" type="text" onChange={handleForm} name="weight-imperial-maximum" value={weight.imperial.split(' - ')[1]} />
                                                    {errors.unitError.weightImperialMaximum && <h4 className="error">Must be a number</h4>}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group favorite">
                                        <label htmlFor="favorite">Favorite?: </label>
                                        <div className="form-group favorite" name="favorite">
                                            <input type="radio" onChange={handleForm} name="favorite" value={true} checked={favorite ? 'checked' : ''} />
                                            <label htmlFor="image">Yes </label>
                                        </div>
                                        <div className="form-group favorite">
                                            <input type="radio" onChange={handleForm} name="favorite" value={false} checked={favorite ? '' : 'checked'} />
                                            <label htmlFor="image">No </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group  card flex-right">
                                    <div className="form-group">
                                        <label htmlFor="image">Image URL: </label>
                                        <input className="input-group" type="text" onChange={handleForm} name="image" value={image_url} />
                                        <img src={image_url} />
                                    </div>
                                    <div className="form-group ">
                                        <label htmlFor="bred_for">Bred for: </label>
                                        <input className="input-group" type="text" onChange={handleForm} name="bred_for" value={bred_for} />
                                        {errors.bredForError && <h4 className="error">This field cannot contain numbers</h4>}
                                    </div>
                                    <div className="form-group ">
                                        <label htmlFor="breed_group">Breed group: </label>
                                        <input className="input-group" type="text" onChange={handleForm} name="breed_group" value={breed_group} />
                                    </div>
                                    <div className="form-group ">
                                        <label htmlFor="life_span">Life span: </label>
                                        <input className="input-group" type="text" onChange={handleForm} name="life_span" value={life_span} />
                                    </div>
                                    <div className="form-group ">
                                        <label htmlFor="origin">Country of Origin: </label>
                                        <input className="input-group" type="text" onChange={handleForm} name="origin" value={origin} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex-down">
                                <label htmlFor="temperaments">Temperament(s):</label>
                                <div className="checkbox-box">{temperaments?.map(x => {
                                    if (dogInfo.temperament.includes(x.name)) {
                                        return (<div className="checkbox"><input type="checkbox" key={x.name} value={x.name} name={x.name} onChange={handleCheckbox} checked={true} /><label htmlFor={x.name}>{x.name}</label></div>);
                                    }
                                    else return (<div className="checkbox"><input type="checkbox" key={x.name} value={x.name} name={x.name} onChange={handleCheckbox} /><label htmlFor={x.name}>{x.name}</label></div>);
                                }
                                )}
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={(Object.values(errors).find(x => x === true) || Object.values(errors.unitError).find(x => x === true)) ? 'disabled' : ''}>{dogInfo.comesFrom === 'DB' ? "Update" : "Create"}</button>
                                {(Object.values(errors).find(x => x === true) || Object.values(errors.unitError).find(x => x === true)) && <h3 className="error">There are errors on some form fields</h3>}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default CreateBreed;
