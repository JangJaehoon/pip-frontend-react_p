import {Link, useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import "./css/edit.css";

let PostEdit = () =>{
    const{id} = useParams();
    const navigate = useNavigate(); // Page이동에 사용함.

    let[title, setTitle] = useState("");
    let[content, setContent] = useState("");

    useEffect(()=>{
        setTitle(`${id}'s name ` );
        setContent(`${id}'s project ` );
    },[id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Posting is edited");
        // navigate("/post/edit/"+id);
        navigate(`/post/${id}`);
    }

    return (
         <div className={"post-edit-container"}>
             <h1 className={"post-edit-title"}>Edit Posting</h1>
             <form onSubmit={handleSubmit} className={"post-edit-form"}>
                 <div className={"form-group"}>
                    <label htmlFor={"title"}>Name</label>
                     <input id={"title"} type={"text"} value={title} onChange={(e) => setTitle(e.target.value)}
                    placeholder={"Input your name."}  />
                 </div>
                 <div className={"form-group"}>
                     <label htmlFor={"content"}>Project</label>
                     <textarea id={"content"} value={content} onChange={(e) => setContent(e.target.value)}
                               placeholder={"Enter Project"}/>
                 </div>
                 <div className={"button-group"}>
                     <button type={"submit"} className={"submit-button"} >
                         Editing Completed
                     </button>
                     <Link to={`/post/${id}` } className={"cancel-button"}>Cancel</Link>
                 </div>


             </form>
        </div>
    );
}

export default PostEdit;