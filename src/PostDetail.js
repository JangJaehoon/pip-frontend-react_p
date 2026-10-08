import React from 'react';
import {Link, useParams} from "react-router-dom";
import "./css/detail.css";
import {useEffect, useState} from "react";
import axios from "axios";

let PostDetail = () => {
    const {id} = useParams(); // URL에 포함된 파라미터 값을 가져오는 hook
    // http://localhost:3000/users/1 : このURLへ移動後、idが1 の場合に含まれるデータを持って来る。

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
                console.log('情報の呼出し成功',res.data);
                setPost(res.data);
            }).catch(err=>{
                console.error('情報の呼出し失敗',err);

            // axios.get() -> サーバーへの要請
            // -> 応答成功の場合 -> then() 実行
            // -> 応答失敗の場合 -> catch() 実行
        });
    }

    // getPost Arrow 関数を実行。
    useEffect(()=>{
        getPost();
    },[]);

    // const post = {
    //     id,
    //     title: `The name of ${id}`,
    //     content: `The project of ${id}`,
    //     // empID: `EmployId of ${id}`,
    //     // info: `The other information of ${id}`
    // };

    const handleDelete = () => {
        alert(`情報が削除されました。`);
    }

    return (
        <div className={"post-detail-container"}>
            <h1 className={"post-detail-title"}>{post.title}</h1>
            <p className={"post-detail-content"}>{post.content}</p>
            {/*<p className={"post-detail-empID"}>{post.empID}</p>*/}
            {/*<p className={"post-detail-info"}>{post.info}</p>*/}
            <div className={"button-group"}>
                <Link to={`/posts/edit/${id}`} className={"edit-button"}>
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