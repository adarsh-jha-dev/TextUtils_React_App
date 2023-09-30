// import logo from './logo.svg';
import { useState } from "react";
import "./App.css";
// import About from "./components/About";
import Navbar from "./components/Navbar";
import TextForm from "./components/textForm";
import Alert from "./components/Alert";

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
// } from "react-router-dom";

// let name = "Adarsh is a menace";

function App() {

  const [mode, setmode] = useState('light');
  const [alert, setAlert] = useState(null);

  const sendAlert = (message, type) =>{
    setAlert({
      msg : message,
      type: type
    })

    setTimeout(()=>{
      setAlert(null);
    }, 1500)
  }

  const toggleMode = ()=>{
    if(mode === 'light')
    {
      setmode('dark');
      sendAlert("Dark Mode Enabled","success");
      document.body.style.backgroundColor = "#042743";
      document.title  = "TextUtils - Dark Mode";
    }else{
      sendAlert("Light Mode Enabled","success");
      document.body.style.backgroundColor = "white";
      setmode('light');
      document.title = "TextUtils - Light Mode";
    }
  }
  return (
    <>
      {/* <Router> */}
        <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode}/>
        <Alert alert={alert}/>
          {/* <Routes> */}
            {/* {/* <Route exact path="/" element={ */}
          <TextForm mode={mode} sendAlert={sendAlert} heading="Enter the text to analyze"/>
              
            {/* <Route exact path="/about" element={<About />} /> */}
          {/* </Routes> */}
      {/* </Router> */}
    </>
  );
}

export default App;
