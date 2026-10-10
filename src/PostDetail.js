import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import "./css/detail.css";
import {useEffect, useState} from "react";
import axios from "axios";

let PostDetail = () => {
    const {id} = useParams(); // URL에 포함된 파라미터 값을 가져오는 hook
    // http://localhost:3000/users/1 : このURLへ移動後、idが1 の場合に含まれるデータを持って来る。
    let navigate = useNavigate();

    let [post, setPost]
        = useState({　// useState：状態管理hook. 引数が状態
        title:"",
        content:""
    });

    const getPost = () =>{
        // axios : 非同期Api 呼出し 処理 library
        axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`)
            //　REACT_APP_API_URL=http://localhost:8080/api
            .then(res=>
            {
                // console.log('情報の呼出し成功',res.data);
                console.log(res.data);
                setPost(res.data);
            }).catch(err=>{
                // console.error('情報の呼出し失敗',err);
                console.error(err);

            // axios.get() -> サーバーへの要請
            // -> 応答成功の場合 -> then() 実行
            // -> 応答失敗の場合 -> catch() 実行
        });　 // The end of catch
    } // The end of getPost function

    // getPost Arrow 関数を実行。
    useEffect(()=>{
        getPost();
    },[]);

    const handleDelete = () => {
        if(!window.confirm("本当に削除しますか？")){
            return;
        }

        axios.delete(`${process.env.REACT_APP_API_URL}/posts/${id}`)
            .then(res=>{
                console.log(res.data);
                alert("削除されました。");
                navigate("/home");
            }).catch(
            err=>{
                console.log(err);
                alert("削除過程の中でエラーが発生致しました。");
            }
        ); // The end of catch

        // alert(`情報が削除されました。`);
    }

    // const post = {
    //     id,
    //     title: `The name of ${id}`,
    //     content: `The project of ${id}`,
    //     // empID: `EmployId of ${id}`,
    //     // info: `The other information of ${id}`
    // };



    return (
        <div className={"post-detail-container"}>
            <h1 className={"post-detail-title"}>{post.title}</h1>
            <p className={"post-detail-content"}>{post.content}</p>
            {/*<p className={"post-detail-empID"}>{post.empID}</p>*/}
            {/*<p className={"post-detail-info"}>{post.info}</p>*/}
            <div className={"button-group"}>
                <Link to={`/post/edit/${post.id}`} className={"edit-button"}>
                    編集
                </Link>
                <button onClick={handleDelete} className={"delete-button"}>
                    削除
                </button>
            </div>
            <Link to="/home" className="back-link">戻る</Link>
        </div>
    );
}

export default PostDetail;