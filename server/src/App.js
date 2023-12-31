import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import DashBoard from './component/DashBoard';
import CasterPage from './component/CasterPage';
import Login from './component/User/Login';
import Registration from './component/User/Registration';
import 'mapbox-gl/dist/mapbox-gl.css';
function App() {
  return (
    <div className="App">
    
      <Router>
        <Routes>
        <Route path='/' element ={<Login/>}/>
        <Route path='/register' element = {<Registration/>}/>
        <Route path="/dashboard" element={  <DashBoard/>}/>
        </Routes>
      </Router>
    

    </div>
  );
}

export default App;
