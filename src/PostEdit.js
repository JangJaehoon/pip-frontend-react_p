import {Link, useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import React from "react";
import "./css/edit.css";
import axios from "axios";

// function PostEdit() {
let PostEdit = () =>{
    const{id} = useParams();
    // useParam : React RouterからURLパスのparameterを持って来る。
    const navigate = useNavigate(); // Page이동에 사용함.

    // let[title, setTitle] = useState("");
    // let[content, setContent] = useState("");
    let [post, setPost]
        = useState({　// useState：状態管理hook. 引数が状態
        title:"",
        content:""
    });

    // posting データ呼出し
    useEffect(()=>{
        // setTitle(`${id}'s name ` );
        // setContent(`${id}'s project ` );
        // 最初はバックエンド側のApi側から値を呼び出す。
        axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`)
            //　REACT_APP_API_URL=http://localhost:8080/api
            .then(res=>
            {
                // console.log('情報の呼出し成功',res.data);
                console.log(res.data);
                setPost(res.data);
            }).catch(err=>{
                console.error(err);
                alert('情報の呼出し失敗');
                // axios.get() -> サーバーへのapi要請
                // -> 応答成功の場合 -> then() 実行
                // -> 応答失敗の場合 -> catch() 実行
            } // The end of catch
        ) // The end of axios.get()
    },[id]);

    const handleOnChange = (e)=>{　
        // 変化を反映するロジック
        const {name, value} = e.target;
        setPost({
            ...post,
            [name]: value
            }
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // axios.put(`${process.env.REACT_APP_API_URL}/posts/${id}`, post)
        axios.put(`${process.env.REACT_APP_API_URL}/posts/${id}`, post)
            .then(res=>{
                console.log(res.data);
                alert("編集が完了されました。");
                // navigate(`/posts/${id}`);
                navigate(`/post/${post.id}`);
            }).catch(
                err=>{
                    console.log(err);
                    alert("編集を失敗致しました。");
                }
        )

        alert("データが修正されました。");
        // navigate("/post/edit/"+id);
        navigate(`/post/${id}`);
    }

    return (
         <div className={"post-edit-container"}>
             <h1 className={"post-edit-title"}>Edit Posting</h1>
             <form onSubmit={handleSubmit} className={"post-edit-form"}>
                 <div className={"form-group"}>
                    <label htmlFor={"title"}>Name</label>
                     <input id={"title"} type={"text"} value={post.title}
                         //    onChange={(e) => setTitle(e.target.value)}
                            onChange={handleOnChange} // 変化を反映するロジック
                         name={"title"}
                    placeholder={"名前を入力してください。"}  />
                 </div>
                 <div className={"form-group"}>
                     <label htmlFor={"content"}>Project</label>
                     <textarea id={"content"} 　value={post.content}
                               // onChange={(e) =>
                               //     setContent(e.target.value)}
                               onChange={handleOnChange} // 変化を反映するロジック
                         name={"content"}
                               placeholder={"参加中のプロジェクトを入力してください。"}/>
                 </div>

                 {/*<div className={"form-group"}>*/}
                 {/*    <label htmlFor={"empID"}>Project</label>*/}
                 {/*    <textarea id={"empID"} value={empID} onChange={(e) => setContent(e.target.value)}*/}
                 {/*              placeholder={"Enter Employee ID"}/>*/}
                 {/*</div>*/}

                 {/*<div className={"form-group"}>*/}
                 {/*    <label htmlFor={"info"}>Project</label>*/}
                 {/*    <textarea id={"info"} value={info} onChange={(e) => setContent(e.target.value)}*/}
                 {/*              placeholder={"Enter Other Information"}/>*/}
                 {/*</div>*/}

                 <div className={"button-group"}>
                     <button type={"submit"} className={"submit-button"} >
                         編集
                     </button>

                     <Link to={`/post/${id}` } className={"cancel-button"}>
                         キャンセル
                     </Link>
                 </div>

             </form>
        </div>
    );
}

export default PostEdit;