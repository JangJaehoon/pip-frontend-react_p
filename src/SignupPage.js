import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function SignupPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try{
            await axios.post("http://localhost:8080/signup",
                {username, password}
            );
            alert("会員加入成功");
            navigate("/login");
        }catch(err){
            alert("会員加入失敗:" + (err.response?.data || err.message) );
        }


    }

    return (
        <div className="auth-container">
            <h2>会員加入</h2>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="ユーザー ID"
                    value={username}
                    onChange=
                        {(e)=>
                            setUsername(e.target.value)}
                    // required
                    />
                <input
                    type="password"
                    placeholder='パスワード'
                    value={password}
                    onChange={(e)=>
                            setPassword(e.target.value)}
                    // required
                    />

                <button type="submit">会員加入</button>
            </form>
        </div>
    )
}

export default SignupPage;