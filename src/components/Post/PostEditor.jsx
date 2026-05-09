import { useState, useEffect } from "react";
import styles from './PostEditor.module.css';

export default function Post({initialData, onSubmit, postCreated}){
    const [title, setTitle] = useState(initialData?.title || "");
    const [content, setContent] = useState(initialData?.content || "");
    const [published, setPublished] = useState(initialData?.published || "");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try{
            await onSubmit({
                title,
                content,
                published
            });

            setSuccess(true);

            if(postCreated){
                postCreated();
            }
        }catch(error){
            setError(error.message);
        }finally{
            setLoading(false);
        }

    }
    useEffect(()=>{
        if(initialData){
            setTitle(initialData.title || "");
            setContent(initialData.content || "");
            setPublished(initialData.published || "");
        }
    },[initialData]);

    return(
        <form onSubmit={handleSubmit} className={styles.postEditorForm}>
            <h2 className={styles.postEditorHeader}>
                {`${postCreated ? "Create Post" : "Edit Post"}`}
            </h2>

            <div className={styles.titleContainer}>
                <label>Title</label>
                <input 
                    type="text"
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                    required
                />
            </div>

            <div className={styles.contentContainer}>
                <label>Content</label>
                <textarea
                    value={content}
                    onChange={(e)=> setContent(e.target.value)}
                    rows={10}
                    required 
                />
            </div>

            <div className={styles.publishedContainer}>
                <label>
                    <input 
                        type="checkbox" 
                        checked={published}
                        onChange={(e)=> setPublished(e.target.value)}
                        className={styles.publishedCheckbox}
                    />
                    Published
                </label>
            </div>
            <button type="submit" disabled={loading} className={styles.submitBtn}>
                {loading ? "Loading..." : `${postCreated ? "Create Post" : "Submit"}`}
            </button>

            {error && <p>{error}</p>}
            {success && <p>Post saved successfully</p>}
        </form>
    )
}