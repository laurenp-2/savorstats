import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Upload from "./components/Upload";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Login from "./components/Login";
import { ArrowRight, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "./auth/AuthUserProvider";
import { signIn, signOut } from "./auth/auth";

function App() {
  const [showLoading, setShowLoading] = useState(false);
  const { user } = useAuth();
  const {authLoading} = useAuth();

  const handleArrowClick = async () => {
    setShowLoading(true);
    try {
      signIn();
      setShowLoading(false);
    } catch (error) {
      console.error("Sign-in failed:", error);
      setShowLoading(false);
    }
  };

  const handleLogOut = async () => {
    try {
      signOut();
      setShowLoading(false);
    } catch (error) {
      console.error("Sign-out failed:", error);
      setShowLoading(false);
    }
  };

  if (authLoading) {
    return <div className="loadingPage">Loading...</div>; // Show a loading screen until the auth check is done
  }

  return (
    <>
      <div>
        {!user && !showLoading && (  //if a user is not signed in, show welome pop up
          <div className="welcomePopup">
            <h1 id="welcomeHeader" className="cssanimation sequence fadeInBottom">
              Welcome to SavorStats!
            </h1>
            <div className="welcomeExit">
              <p>Get started</p>
              <ArrowRight onClick={handleArrowClick} />
            </div>
          </div>
        )}
      </div>

      <div>
        {showLoading && !user && (  //blank screen for google sign in pop up
          <div className="loadingPage">
          </div>
        )}
      </div>

      <div>
        {user && !showLoading && (  //if there is a user, allow them to access SavorStates
          <>
            <div className="header">
              <h1>SavorStats</h1>
              <h3>Save your stats!</h3>
              <LogOut onClick={handleLogOut} />
            </div>
            <NavBar />
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/profile" element={<Profile />} />
             <Route path="/login" element={<Login />} />
            </Routes>
          </>
        )}
      </div>
    </>
  );
}

export default App;


