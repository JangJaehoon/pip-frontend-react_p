import {useState} from "react";
import {useNavigate} from "react-router-dom";

function SignupPage() {
    const [username, setUsernae] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSignup = async (e) => {

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
                            setUsernae(e.target.value)}
                    />
                <input
                    type="password"
                    placeholder='パスワード'
                    value={password}
                    onChange={(e)=>
                            setPassword(e.target.value)}
                    />

                <button type="submit">会員加入</button>
            </form>
        </div>
    )
}

export default SignupPage;