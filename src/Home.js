import {useState} from "react";
import {Link} from "react-router-dom";
import "./css/list.css";

let Home = () => {

    const allPosts = Array.from({length:25}, (_,index) =>({
        id:index+1,
            title:`${index+1} 番目の人のName`,
            content:`${index+1} 番目の人のProject`
    }));

    const postsPerPage = 10; // Paging syori
    const[currentPage, setCurrentPage] = useState(1);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(allPosts.length / postsPerPage);
    const pageNumbers
        = Array.from( {length:totalPages}, (_, index) => index + 1);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div className={"home-container"}>
            <h1 className={"home-title"}>一覧</h1>
            <div className={"posts-list"}>
                {
                    currentPosts.map(post => (
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