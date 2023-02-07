import { Link } from 'react-router-dom';
import videoBg from '../assets/perros.mp4'
import './LandingPage.css'

const LandingPage = () => {

    return (
        <div className="landing-page">
            <video src={videoBg} autoPlay loop muted />
            <header className="masthead">
                <div className="card">

                    <div className="masthead-heading">BIENVENIDO A NUESTRA PAGINA DE PERRITOS!</div>
                    <div className="masthead-subheading">Es un gusto que te gusten tanto los perritos como a nosotros!</div>
                    <div className="masthead-subheading">Aqui encontraras informacion de las diferentes razas de perro</div>
                    <Link to = "/home" className="btn btn-primary btn-xl text-uppercase">Comencemos</Link>
                    
                </div>
            </header>
        </div>
    )
};

export default LandingPage;
