import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import Login from "./component/User/Login";
import Registration from "./component/User/Registration";
import Dashboard from "./component/Dashboard";
import NewDashBoard from "./component/NewDashBoard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Registration/>}/>
        <Route path="/login" element={<Login />} />
        {/* <Route path='/dashboard' element={<Dashboard/>}/> */}
        <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
