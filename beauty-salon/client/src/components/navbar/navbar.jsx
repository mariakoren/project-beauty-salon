import { useContext } from "react";
import "./navbar.css";
import { AuthContext } from "../../context/AuthContext";
import {Link} from "react-router-dom";
const NavBar = () => {

    const { user } = useContext(AuthContext);
    return (
        <div className ="navbar">
            <div className="navContainer">
                <Link to="/" style={{color: indexedDB, textDecoration: "none"}} >
                    <span className="logo">Maria's Beauty</span>
                </Link>
                
                {user ? user.username : <div className="navItems">
                    <button className="navButton">Register</button>
                    <button className="navButton">Login</button>
                </div>}

            </div>
        </div>
    )
}

export default NavBar;
