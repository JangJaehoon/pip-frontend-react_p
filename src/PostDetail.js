import {Link, useParams} from "react-router-dom";
import "./css/detail.css";

let PostDetail = () => {
    const {id} = useParams();

    const post = {
        id,
        title: `The name of ${id}`,
        content: `The project of ${id}`,
        // info: `The other information of ${id}`
    };

    const handleDelete = () => {
        alert(`The posting is deleted.`);
    }


    return (
        <div className={"post-detail-container"}>
            <h1 className={"post-detail-title"}>{post.title}</h1>
            <p className={"post-detail-content"}>{post.content}</p>
            <p className={"post-detail-content"}>{post.info}</p>
            <div className={"button-group"}>
                <Link to={`/posts/edit/${id}`} className={"edit-button"}>
                    Edit
                </Link>
                <button onClick={handleDelete} className={"delete-button"}>
                    Delete
                </button>
            </div>
            <Link to={"/"} className={"back-link"}>Back to List</Link>

        </div>
    );
}

export default PostDetail;