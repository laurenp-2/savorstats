import { Link } from "react-router-dom";
 


const NavBar = () => {
  return (
    <nav className="navBar">
      <div className="navLinks">
        <Link to="/">Feed</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/upload">Upload</Link>
      </div>
    </nav>
  );
};

export default NavBar;
