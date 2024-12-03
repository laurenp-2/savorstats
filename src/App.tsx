import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Upload from "./components/Upload";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import { ArrowRight, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "./auth/AuthUserProvider"; 
import { signIn, signOut } from './auth/auth';


function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const { user } = useAuth(); // Get user from the context

  const handleArrowClick = () => {
    setShowWelcome(false);
  };


  const handleSignIn = async () => {
    await signIn(); // Handle Google sign-in
  };

  const handleLogout = async () => {
    await signOut(); // Sign out the user using your custom signOut
    setShowWelcome(true); // Show the welcome popup after logout
  };

  useEffect(() => {
    if (user) {
      setShowWelcome(false); // Automatically hide the popup if the user is signed in
    } else {
      setShowWelcome(true); // Show welcome popup if no user
    }
  }, [user]);

  return (
    <>
      {/* Welcome Popup - Only shows if the user is not signed in */}
      <div>
        {showWelcome && !user && (
          <div className="welcomePopup">
            <h1 id="welcomeHeader" className="cssanimation sequence fadeInBottom">
              Welcome to SavorStats!
            </h1>
            <div className="welcomeExit">
              <p>get started</p>
              <ArrowRight onClick={handleArrowClick} />
            </div>
          </div>
        )}
      </div>
      {/* Main App Content - Shows once the user is signed in */}
      <div>
        {!showWelcome && (
          <>
            <div className="header">
              <div className="left">
              <h1>SavorStats</h1>
              <h3>Save your stats!</h3>
              </div>
              {user && ( 
                <div className="logOut">
              <p>Log Out</p>
              <LogOut onClick={handleLogout} />
            </div>
          )}
             
            </div>
            
           
            <NavBar signedIn={user}/>
            <div>
              <Routes>
                <Route
                  path="/"
                  element={<Feed signedIn={!!user} onSignIn={handleSignIn} />} // Pass signedIn based on user
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
