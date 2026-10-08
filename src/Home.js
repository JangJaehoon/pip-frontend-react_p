import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./css/list.css";
import axios from "axios";

let Home = () => {

    const[posts, setPosts] = useState([]);
    const[totalPages, setTotalPages] = useState(0);
    const[currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    const getPostList = () =>{
        axios.get(`${process.env.REACT_APP_API_URL}/posts`,{
            // env.REACT_APP_API_URL : http://localhost:8080/api
            params:{
                page:currentPage - 1,
                size:postsPerPage
            }
        }).then(res=>{
            console.log(res.data.content);
            setPosts(res.data.content);
            setTotalPages(res.data.totalPages);
        }).catch(err=>{ // home画面一覧にデータを持って来ることを失敗した時
            console.log("Postingを持って来ることを失敗");
        })
    }

    // useEffect : 関数型コンポーネントからside effectを処理するHook
    useEffect(() => {
        getPostList(); // ページィング処理関数
    },[currentPage] );

    const pageNumbers = Array.from(
        {length: totalPages},
        (_, index)=>index+1
    );

    // const allPosts = Array.from({length:25}, (_,index) =>({
    //     id:index+1,
    //         title:`${index+1} 番目の人のName`,
    //         content:`${index+1} 番目の人のProject`
    // }));

    // 1ページに10件ずつ表示するページング処理
    // const postsPerPage = 10; // Paging syori
    // const[currentPage, setCurrentPage] = useState(1);
    //
    // const indexOfLastPost = currentPage * postsPerPage;
    // const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);
    //
    // const totalPages = Math.ceil(allPosts.length / postsPerPage);
    // const pageNumbers
    //     = Array.from( {length:totalPages}, (_, index) => index + 1);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div className={"home-container"}>
            <h1 className={"home-title"}>一覧</h1>
            <div className={"posts-list"}>
                {
                    // currentPosts.map(post => (
                    posts.map(post => (
                        <div key={post.id} className={"post-card"}>
                            <h2 className={"post-title"}>
                                <Link to={`/post/${post.id}`}>{post.title}</Link>
                            </h2>
                            <p className={"post-content"}>
                                {post.content}
                            </p>
                        </div>
                    ))
                }
            </div>

            <div className={"pagination"}>
                {
                    pageNumbers.map(
                        number => (
                            <button key={number} className={`page-btn ${number === currentPage ? 'active' : ''}`}
                            onClick={()=>{
                                handlePageChange(number);
                            }} >
                                {number}
                            </button>
                        )
                    )
                }
            </div>

            <Link to={"/create"} className={"create-link"}>登録</Link>
        </div>
    );
}

export default Home;