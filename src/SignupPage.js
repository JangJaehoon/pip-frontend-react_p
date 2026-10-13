import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import "./css/home.css";

let SignupPage = () => {
// function SignupPage() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
    let [formData,
        setFormData]
        = useState({
        username: "",
        password: "",
        // empID: "",
        // info: ""
    }); // useStateは状態管理


    const navigate = useNavigate();

    let onChangeFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onClickSubmit = () => {

            axios.post(`${process.env.REACT_APP_API_URL}/posts`,formData)
                .then(res => {
                    console.log(res.data);
                    alert("会員加入成功");
                    navigate("http://localhost:8080/login");

                }).catch(err => {console.log(err);})

    }


    // const handleSignup = async (e) => {
    //     e.preventDefault();
    //     try{
    //         await axios.post("http://localhost:8080/signup",
    //             {username, password}
    //         );
    //         alert("会員加入成功");
    //         navigate("/login");
    //     }catch(err){
    //         alert("会員加入失敗:" + (err.response?.data || err.message) );
    //     }
    // }

    return (
        <div className={"create-post-container"}>
            <h2 className="create-post-title">会員加入</h2>
            <form className="create-post-form">
              <div className={"form-group"}>
                <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="ユーザー 名前"
                    // value={username}
                     onChange={onChangeFormData}
                    // onChange=    {(e)=>
                    //         setUsername(e.target.value)}
                    // required
                    />
              </div>
              <div className={"form-group"}>
                <input
                    id="password"
                    name="password"
                    type="text"
                    placeholder='パスワード'
                    // value={password}
                    onChange={onChangeFormData}
                    // onChange={(e)=>
                    //         setPassword(e.target.value)}
                    // required
                    />
              </div>
                {/*<button type="submit" onClick={onClickSubmit} Link to={"/login"}>会員加入</button>*/}
                <Link to={"/login"} onClick={onClickSubmit} className={"create-link"}>会員加入</Link>
            </form>
        </div>
    )
}

export default SignupPage;