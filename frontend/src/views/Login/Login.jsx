import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const { updateToken } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const userCredentials = {
            userName: formData.get("username"),
            password: formData.get("password"),
        };

        try {
            const res = await fetch("http://localhost:7777/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userCredentials),
            });
            const data = await res.json();

            if (data.token) {
                updateToken(data.token);
            } else {
                updateToken(null);
            }

            navigate("/orders");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />
            <section className="login-container">
                <form className="login-form" onSubmit={handleFormSubmit}>
                    <h1 className="login-title">Fruitoora CMS - Admin Login</h1>
                    <div className="input-fields">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" placeholder="Enter username" />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                        />
                    </div>
                    <div className="login-credentials">
                        <p>Username: admin</p>
                        <p>Password: admin</p>
                    </div>
                    <div className="checkbox-fields">
                        <input type="checkbox" name="remember" id="checkbox" />
                        <label htmlFor="checkbox">Remember my username</label>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </section>
        </>
    );
};

export default Login;
