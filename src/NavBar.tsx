import { Link } from "react-router-dom";

const NavBar = ({ signedIn }: { signedIn: boolean }) => {
  return (
    <nav className="navBar">
      <div className="navLinks">
        <Link to="/">Feed</Link>
        {signedIn && (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/upload">Upload</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
