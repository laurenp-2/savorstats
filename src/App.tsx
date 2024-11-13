import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Upload from "./components/Upload";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Login from "./components/Login";

function App() {
  return (
    <>
    <div className="header">
      <h1>SavorStats</h1>
      <h3>Save your stats</h3>
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
  );
}

export default App;
