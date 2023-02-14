import { useState } from "react";
import BreedsList from "../components/BreedsList";
import NavBar from "../components/NavBar";


const HomePage = () => {
    

    const [input, setInput] = useState('')
    const [click, setClick] = useState();
    return (
        <div className="content-wrapper" onClick={e => setClick(e)}>
        
            <NavBar setInput={setInput} input ={input} renderedFrom = 'breed-list'/>
        
            <BreedsList input={input} click = {click}/>
        
        </div>
    )
};

export default HomePage;
