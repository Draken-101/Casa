import { useState } from "react";
import axios from "axios";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../Context/useContext";

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUser } = useUserContext();

    const handleLogin = async (event) => {
        event.preventDefault();
        setUser({
            token: '',
            name: ''
        });

        try {
            const response = await axios.post('http://localhost:3000/api/v1/users/Login', { name: username, password: password });
            console.log(response);
            if (response.status === 200) {
                setUser({ name: username, token: response.data.token.toString(), role:response.data.role });
                console.log('Autenticación exitosa. Token:', response.data.token);
                navigate('/Casa');
            } else {
                setError('Error en la autenticación: ' + response.data.message);
            }
        } catch (error) {
            setError('Error en la solicitud: ' + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Login">
            <form className="formLogin" onSubmit={handleLogin}>
                <h1 className="title">LOGIN</h1>
                <input
                    className="usernameBoton"
                    placeholder="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="contraseñaBoton"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="loginBoton" type="submit">
                </button>
                <div>
                    <span>
                        Si no tienes cuenta
                        <Link to="/Register" style={{ marginLeft: '.5vw', color: "blue" }}>
                            <span>
                                Registrate
                            </span>
                        </Link>
                    </span>
                </div>
            </form>
        </div>
    );
}
