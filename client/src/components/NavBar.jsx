import './NavBar.css'
import {NavLink , Link} from 'react-router-dom';
import lupa from '../assets/lupa.png'
import mainLogo from '../assets/main_logo.png'
import { useState } from 'react';
import fetchPerros from '../redux/thunks/fetchDogs';
import { insert } from '../redux/slices/dogSlice';
import {useDispatch} from 'react-redux';
import { useEffect } from 'react';

const NavBar = () => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
      (async function () {
        let perros = await fetchPerros(input);
      dispatch(insert(perros));
    })();
    
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let perros = await fetchPerros(input);
        dispatch(insert(perros));
    }
    return (
        
            <nav className="navbar">
                <Link to = "/home" className ="navbar-brand"><img className='logo' src={mainLogo} alt="logo" /></Link>
                <form onSubmit={handleSubmit} className='input-group focusable'>
                    <input placeholder='Search Breeds'onChange={e => setInput(e.target.value)}/>
                    <button onClick={handleSubmit}><img src={lupa} alt="lupa" /></button>
                </form>
                <ul className='navbar-nav'>
                    <NavLink className= "nav-item" to = "/create">New Breed</NavLink>
                    <NavLink className= "nav-item" to = "/home">Stored Breeds</NavLink>
                    <NavLink className= "nav-item" to = "/">Close App</NavLink>
                </ul>

            </nav>
        
    )
};

export default NavBar;
