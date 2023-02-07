import { useState } from "react";
import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import './CreateBreed.css'

const CreateBreed = () => {

    //STORE
    const {temperaments} = useSelector(state => state.dogReducer)

    //ESTADOS PARA CONTROLAR EL FORMULARIO:
    const [breed, setBreed] = useState('');
    const [heightMetric, setHeightMetric] = useState('');
    const [heightImperial, setHeightImperial] = useState('');
    const [weightMetric, setWeightMetric] = useState('');
    const [weightImperial, setWeightImperial] = useState('');
    const [lifeSpan, setLifeSpan] = useState('');
    const [temperamentChoices, setTemperamentChoices] = useState([]);



    //Form Control:

    const handleForm = (e) => {
        switch (e.target.name){
            case 'breed':
                setBreed(e.target.value);
                break;
            case 'height-metric':
                setHeightMetric(e.target.value);
                break;
            case 'height-imperial':
                setHeightImperial(e.target.value);
            case 'weight-metric':
                setWeightMetric(e.target.value);
                break;
            case 'weight-imperial':
                setWeightImperial(e.target.value);
                break;
            case 'life_span':
                setLifeSpan(e.target.value);
                break;
            

        }
    }

    const handleCheckbox = (e) => {
        let newArray = [...temperamentChoices];
        e.target.checked? newArray.push(e.target.value): newArray.splice(newArray.findIndex(x => x === e.target.value),1)
        setTemperamentChoices(newArray);
    }

    const handleSubmit = (e) => {
        
        e.preventDefault();

        setTemperamentChoices(temperamentChoices.join(', '));
        console.log(temperamentChoices);

    }



    return (
        <>
            <div className="content-wrapper ">
                <NavBar />
                <div className="content">
                    <div className="card">

                        <h2>Breed creation form: </h2>
                        <form action="post" onSubmit={handleSubmit}>
                            <label htmlFor="breed">Breed name: </label>
                            <input type="text" onChange={handleForm} name="breed" />
                            <label htmlFor="height-metric">heights:</label>
                            <input type="text" onChange={handleForm} name="height-metric"/>
                            <input type="text" onChange={handleForm} name="height-imperial"/>
                            <label htmlFor="weight-imperial">weights:</label>
                            <input type="text" onChange={handleForm} name="weight-metric"/>
                            <input type="text" onChange={handleForm} name="weight-imperial"/>
                            <label htmlFor="life_span">Life span: </label>
                            <input type="text" onChange={handleForm} name="life_span"/>
                            <label htmlFor="temperaments">temperament(s)</label>
                            <div className="checkbox-box">{temperaments?.map (x => <div className="checkbox"><input type="checkbox" key ={x} value={x} name={x} onChange ={handleCheckbox}/><label htmlFor={x}>{x}</label></div>)}</div>
                            <button type="submit">Create</button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default CreateBreed;
