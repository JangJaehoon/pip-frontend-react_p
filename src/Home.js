import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./css/home.css";
import axios from "axios";

let Home = () => {

    const[posts, setPosts] = useState([]);

     const [keyword, setKeyword] = useState("");
    // const [searchKeyword, setSearchKeyword] = useState("");
    // 検索ロジックに使う常数 (※ 変数は let 変数名 )

    // The start of paging Logic
    const[totalPages, setTotalPages] = useState(0);
    const[currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    const getPostList = () =>{
        axios.get(`${process.env.REACT_APP_API_URL}/posts`,{
            // env.REACT_APP_API_URL : http://localhost:8080/api
            params:{
                // keyword: keyword, // 検索キーワード
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
    // The End of paging Logic

    // useEffect : 関数型コンポーネントからside effectを処理するHook
    useEffect(() => {
        getPostList(); // ページィング処理関数
    },[currentPage]); // [currentPage, keyword]);　
    // 現在のページを表示, 検索キーワードkeyword 追加

    const pageNumbers = Array.from(
        {length: totalPages},
        (_, index)=>index+1
    );

    // The start of 検索ボタンのイベント
    // const handleSearch = () => {
    //     setCurrentPage(1);
    //     setKeyword(e.target.value);
    // }
    // The end of 検索ボタンのイベント

    // 検索キーワードに従って、filteringされたデータを持って来る。
    // const filteredData = posts.filter(item =>
    //     // 検索語と項目を小文字に変換して、大小文字 区分なして 存在要否を確認。
    //     item.toLowerCase().includes(keyword.toLowerCase())
    // );


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
            <h1 className={"home-title"}>ユーザー 一覧</h1>

            {/*# The start of 検索キーワード 入力欄*/}
            <input
                type="text"
                placeholder="検索キーワードを入力してください。"
                value={keyword}
                // onChange={handleSearch}
                style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '16px',
                    marginBottom: '15px',
                    boxSizing: 'border-box'
                }}
            />
            {/*# The end of 検索キーワード 入力欄*/}

            {/*<button onClick={onSearch}>検索</button>*/}

            <div className={"posts-list"}>
                {
                    // 画面上の表示するリスト処理
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