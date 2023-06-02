import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import capitalize from "../utils/capitalize";

const Navbar = () => {
    const { token, updateToken } = useContext(AuthContext);
    const [isLoggedIn, setIsLoggedIn] = useState(!!token);
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetch("http://localhost:7777/api/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                if (data) {
                    setUser(data);
                }
                setIsLoggedIn(!!token);
            } catch (error) {
                console.log("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [token]);

    const handleSignout = () => {
        updateToken(null);
        navigate("/login");
    };

    return (
        <header className="container">
            <nav className="nav-bar ">
                <NavLink to="/" className="nav-title">
                    Fruitoora CMS
                </NavLink>
                <ul className="nav-links">
                    {isLoggedIn && (
                        <>
                            <NavLink to="/orders">All Orders</NavLink>
                            <NavLink to="/products">All Products & Create New Product</NavLink>
                        </>
                    )}
                </ul>
                <NavLink to={isLoggedIn ? null : "/login"} className="nav-login">
                    {isLoggedIn ? `Welcome ${capitalize(`${user?.userName}`)}` : "Login"}
                    {isLoggedIn && <button onClick={handleSignout}>Sign Out</button>}
                </NavLink>
            </nav>
        </header>
    );
};

export default Navbar;
