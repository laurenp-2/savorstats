import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Feed</Link></li>
        <li> <Link to="/profile">Profile</Link> </li>
        <li><Link to="/upload">Upload</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
