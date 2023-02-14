import { Link } from 'react-router-dom';
import videoBg from '../assets/perros.mp4'
import './LandingPage.css'

const LandingPage = () => {
    

    return (
        <div className="landing-page">
            <video src={videoBg} autoPlay loop muted />
            <header className="masthead">
                <div className="card">

                    <div className="masthead-heading">Welcome to Doggies Network!</div>
                    <div className="masthead-subheading">It is a pleasure that you like doggies as much as we do!</div>
                    <div className="masthead-subheading">In this App, you will find information about all kind of dog breeds</div>
                    <Link to = "/home" className="btn btn-primary btn-xl text-uppercase">Let's get started!</Link>
                    
                </div>
            </header>
        </div>
    )
};

export default LandingPage;
