import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Upload from "./components/Upload";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Login from "./components/Login";
import { ArrowRight } from "lucide-react";
import {useState} from "react"; 

function App() {

  const [showWelcome, setShowWelcome] = useState(true); 

    const handleExitClick = () => {
        setShowWelcome(false); 
    }

  return (
    <>

    <div>
      {showWelcome && (
      <div className="welcomePopup"> 
        <h1 id="welcomeHeader" className="cssanimation sequence fadeInBottom">Welcome to SavorStats!</h1>
        <div className="welcomeExit">
          <p>get started</p>
          <ArrowRight onClick={handleExitClick}/>
        </div>
      </div>
       )}
    </div>
    <div>
      {!showWelcome && (
        <>
        <div className="header">
        <h1>SavorStats</h1>
        <h3>Save your stats!</h3>
      </div>
        <NavBar />
        <div>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        </>
      )}
    </div>
    
    </>
  );
}

export default App;
