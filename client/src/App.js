import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import CreateBreed from './pages/CreateBreed';

function App() {
  return (
    <div className="App">
      

        <Routes>
          <Route path = "/" element ={<LandingPage/>}/>
          <Route path = "/home" element = {<HomePage/>}/>
          <Route path = "/create" element = {<CreateBreed />}/>
        </Routes>
      
      
    </div>
  );
}

export default App;
