import './NavBar.css'
import {NavLink , Link} from 'react-router-dom';
import close from '../assets/close.png'
import mainLogo from '../assets/main_logo.png'



const NavBar = ({setInput, input, renderedFrom}) => {
    
    
    
    

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const handleErase = async (e) => {
        e.preventDefault();
        setInput('');
    }

    const handleChange = (e) => {
        setInput(e.target.value);
        

    }
    return (
        
            <nav className="navbar">
                <Link to = "/home" className ="navbar-brand"><img className='logo' src={mainLogo} alt="logo" /></Link>
                <form onSubmit={handleSubmit} className= {renderedFrom === 'breed-list' ? 'input-group focusable' : 'hidden'}>
                    <input placeholder='Search Breeds'onChange={handleChange} value={input}/>
                    <button onClick={handleErase}>{input&&<img src={close} alt="close" />}</button>
                </form>
                <ul className='navbar-nav'>
                    <NavLink className= "nav-item" to = "/home">All Breeds</NavLink>
                    <NavLink className= "nav-item" to = "/create">New Breed</NavLink>
                    <NavLink className= "nav-item" to = "/">Close App</NavLink>
                </ul>

            </nav>
        
    )
};

export default NavBar;
