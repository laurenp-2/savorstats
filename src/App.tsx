import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Upload from "./components/Upload";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import { ArrowRight, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "./auth/AuthUserProvider";
import { signIn, signOut } from "./auth/auth";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const { user } = useAuth(); 
  const navigate = useNavigate();

  const handleArrowClick = () => {
    setShowWelcome(false);
  };

  const handleSignIn = async () => {
    await signIn(); // Handle Google sign-in
  };

  const handleLogout = async () => {
    await signOut(); // Sign out the user using your custom signOut
    setShowWelcome(true); // Show the welcome popup after logout
    navigate("/")
  };

  const [hasRedirected, setHasRedirected] = useState(false); 

  useEffect(() => {
    if (user) {
      setShowWelcome(false); // Automatically hide the popup if the user is signed in
      //when user logs in, they should always go to Feed (not Profile or Upload)
      if (!hasRedirected) {
        navigate("/"); // Redirect to Feed only if the user has not been redirected yet
        setHasRedirected(true); // Mark that the user has been redirected
      }
    } else {
      setShowWelcome(true); // Show welcome popup if no user 
    }
  }, [user, navigate, hasRedirected]);

  return (
    <>
      <div>
        {showWelcome && !user && (
          <div className="welcomePopup">
            <h1
              id="welcomeHeader"
              className="cssanimation sequence fadeInBottom"
            >
              Welcome to SavorStats
            </h1>
            <div className="welcomeExit">
              <p>get started</p>
              <ArrowRight onClick={handleArrowClick} />
            </div>
          </div>
        )}
      </div>
    
      <div>
        {!showWelcome && (
          <>
          
            <div className="fixedHeader">
              <div className="header">
                <div className="left">
                  <h1>savorstats</h1>
                  <h3>Save your stats!</h3>
                </div>
                {user && (
                  <div className="logOut">
                    <p>Log Out</p>
                    <LogOut onClick={handleLogout} />
                  </div>
                )}
              </div>
              <NavBar signedIn={user != null} />
            </div>

            <div>
              <Routes>
                <Route
                  path="/"
                  element={<Feed signedIn={!!user} onSignIn={handleSignIn} />} 
                />
                <Route path="/upload" element={<Upload />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
