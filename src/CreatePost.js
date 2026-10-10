import "./css/create.css";
import {useState} from "react";
import axios from "axios";

let CreatePost = () => {
// function createPost() { 함수형으로 하면 화면출력 안 됨.
    // 포스팅 생성 화면에서 등록한 데이터를 SpringBoot Api Server로 넘겨줌.
    let [formData,
        setFormData]
        = useState({
        title: "",
        content: "",
        // empID: "",
        // info: ""
    }); // useStateは状態管理

    let onChangeFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onClickSubmit = ()=>{
        axios.post(`${process.env.REACT_APP_API_URL}/posts`,
            formData )         // env.REACT_APP_API_URLは http://localhost:8080/api
            .then(
                res=> {
                console.log(res.data);
                // 포스팅이 성공하면 해당 데이터를 콘솔로 출력.
        } ).catch(
            err => {console.log(err);}
        )
    }

    return(
        <div className={"create-post-container"}>
            <h1 className={"create-post-title"}>登録</h1>
            <form className={"create-post-form"}>

                <div className={"form-group"}>
                    <label htmlFor={"title"}>名前</label>
                    <input id={"title"} type={"text"}
                           name={"title"}
                           onChange={onChangeFormData}
                           placeholder={"名前を入力してください。"}/>
                </div>
                <div className={"form-group"}>
                    <label htmlFor={"content"}>プロジェクト</label>
                    <textarea id={"content"}
                              name={"content"}
                              onChange={onChangeFormData}
                              placeholder={"参加中のプロジェクトを入力してください。"}/>
                </div>

                {/*<div className={"form-group"}>*/}
                {/*    <label htmlFor={"empID"}>empID</label>*/}
                {/*    <textarea id={"empID"}*/}
                {/*              name={"empID"}*/}
                {/*              onChange={onChangeFormData}*/}
                {/*              placeholder={"Enter empID"}/>*/}
                {/*</div>*/}

                {/*<div className={"form-group"}>*/}
                {/*    <label htmlFor={"Info"}>Other Information</label>*/}
                {/*    <textarea id={"Info"}*/}
                {/*              name={"Info"}*/}
                {/*              onChange={onChangeFormData}*/}
                {/*              placeholder={"Enter Other Information"}/>*/}
                {/*</div>*/}

                <button type="submit"
                        className={"submit-button"}
                        onClick={onClickSubmit}
                        >登録</button>
            </form>
        </div>
    );
}

export default CreatePost;