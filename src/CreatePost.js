import "./css/create.css";

let CreatePost = () => {
    return(
        <div className={"create-post-container"}>
            <h1 className={"create-post-title"}>Create Posting</h1>
            <form onSubmit={"create-post-form"}>
                {/*<div className={"form-group"}>*/}
                {/*    <label htmlFor={"id"}>Name</label>*/}
                {/*    <input id={"id"} type={"text"}*/}
                {/*           placeholder={"Enter the employee id"}/>*/}
                {/*</div>*/}
                <div className={"form-group"}>
                    <label htmlFor={"title"}>Name</label>
                    <input id={"title"} type={"text"}
                           placeholder={"Enter Name"}/>
                </div>
                <div className={"form-group"}>
                    <label htmlFor={"content"}>Project</label>
                    <textarea id={"content"} placeholder={"Enter Project"}/>
                </div>
                {/*<div className={"form-group"}>*/}
                {/*    <label htmlFor={"Info"}>Other Information</label>*/}
                {/*    <textarea id={"Info"} placeholder={"Enter Other Information"}/>*/}
                {/*</div>*/}
                <button type="submit" className={"submit-button"}>Enroll Posting</button>
            </form>
        </div>
    );
}

export default CreatePost;