import "./navbar.css";

const NavBar = () => {
    return (
        <div className ="navbar">
            <div className="navContainer">
                <span className="logo">Maria's Beauty</span>
                <div className="navItems">
                    <button className="navButton">Register</button>
                    <button className="navButton">Login</button>
                </div>

            </div>
        </div>
    )
}

export default NavBar;
