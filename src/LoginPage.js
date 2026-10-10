import "./css/App.css";
import axios from "axios";
// import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:8080/api/auth/login",
                { username, password },
                { withCredentials: true }, // HttpOnly Cookie포함
            );
            alert("LogIn Success! Access Token : " + res.data.accessToken);
            navigate("/");
            Cookies.set("accessToken", res.data.accessToken, {
                expires: 0.021,
                path: "/",
            }); //추가
        } catch (err) {
            alert("LogIn Failed : " + (err.response?.data || err.message));
        }
    };

    return (
        <div className="auth-container">
            <h2>ログイン</h2>
            <form onSubmit={handleLogin}>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="ID"
                />

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="パスワード"
                />

                <button type="submit">ログイン</button>
            </form>
        </div>
    );
}

export default LoginPage;
