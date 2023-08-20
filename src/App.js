import React,{useState} from 'react'
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import NoteState from "./context/notes/noteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";


function App(){
  const [alert, setalert] = useState(null)
  const showAlert=(message,type)=>{
    setalert({
     msg:message,
     type:type
    })
    setTimeout(() => {
     setalert(null)
    }, 1000);
 }
    return (<NoteState>
        <Router>
     <Navbar showAlert={showAlert}/>
     <Alert alert={alert}/>
     <div>
      <Routes>
        {/* giving keys to components call is essential because only then react will re-render components */}
        <Route exact path="/" element={<Home showAlert={showAlert}/>}>
        </Route>     
        <Route exact path="/about" element={<About/>}>
        </Route>     
        <Route exact path="/login" element={<Login showAlert={showAlert}/>}>
        </Route>     
        <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}>
        </Route>     
      </Routes>
      </div>
      </Router>
      </NoteState>
    );
}

export default App;
