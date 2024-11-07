import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Upload from "./components/Upload";
import Feed from "./components/Feed";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
