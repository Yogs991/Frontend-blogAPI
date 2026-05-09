import { useState, useEffect, useCallback } from "react";
import {Link, useSearchParams, useNavigate} from "react-router";
import {getPost, createPost, updatePost, deletePost} from "../../api/posts.js";
import PostEditor from "../../components/Post/PostEditor.jsx";
import ConfirmModal from "../../components/ConfirmModal/ConfrimModal.jsx";
import styles from "./PostDetails.module.css";

export default function PostDetails(){
    const [posts, setPosts] = useState([]);

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [postLoading, setPostLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;

    const [showConfirm, setShowConfirm] = useState(null);

    const fetchPosts = useCallback(async()=>{
        try{
            setPostLoading(true);
            const data = await getPost({page, limit: 5});
            setPosts(data.posts);
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
        }catch(err){
            setError(err.message);
        }finally{
            setPostLoading(false);
        }
    },[page]);

    useEffect(()=>{
        fetchPosts();
    },[fetchPosts]);

    if(error) return <p>Error: {error}</p>
    
    const hasPrevious = currentPage > 1;
    const hasNext = currentPage < totalPages;

    const handleDelete = (postId) =>{
        setShowConfirm(postId);
    }

    const confirmDelete = async()=>{
        if(!showConfirm) return;

        try{
            await deletePost(showConfirm);
            setPosts((prev)=> prev.filter((p)=> p.id !== showConfirm));
            setShowConfirm(null);
        }catch(err){
            console.error(err);
        }
    };

    const cancelDelete = () => {
        setShowConfirm(null);
        fetchPosts();
    };

    const handleTogglePublish = async (postId, published) => {
        try {
        await updatePost(postId, {
            published: !published,
        });

        fetchPosts();
        } catch (err) {
        console.error(err);
        }
    };

    const handleEdit = (postId) => {
        navigate(`/post/${postId}`);
    };

    return(
        <section className={styles.postSection}>
            <div className={styles.postEditorContainer}>
                <PostEditor onSubmit={createPost} postCreated={fetchPosts}/>
            </div>
            <div className={styles.postList}>
                <h2 className={styles.postHeader}>All posts</h2>
            </div>

            {postLoading ? (
                <p className={styles.postLoading}>Loading...</p>
                ) : (
                    <div className={styles.postsContainer}>
                        {currentPage > 1 && (
                            <h3 className={styles.pageNumHeader}>
                                Page {currentPage} of {totalPages}
                            </h3>
                        )}
                        {posts.map((post)=>{
                            const createdDate = new Date().toLocaleString("en-GB");
                            return(
                                <div key={post.id} className={styles.postContainer}>
                                    <h2 className={styles.postTitle}>{post.title}</h2>
                                    <div className={styles.postContentContainer}>
                                        <p className={styles.postContent}>{post.content}</p>
                                        <p className={styles.postPublished}>
                                            {`Published: ${post.published ? "Yes" : "No"}`}
                                        </p>
                                        <p className={styles.commentCount}>
                                            {`Comments: ${post.comments.count}`}
                                        </p>
                                        <p className={styles.postCreated}>{createdDate}</p>
                                    </div>
                                    <div className={styles.postControls}>
                                        <button onClick={()=> handleTogglePublish(post.id, post.published)} className={styles.togglePublishBtn}>
                                            {post.published ? "Unpublish Post" : "Publish Post"}
                                        </button>

                                        <button onClick={() => handleEdit(post.id)} className={styles.editBtn}>
                                            Edit
                                        </button>
                                        
                                        <button onClick={()=> handleDelete(post.id)} className={styles.deleteBtn}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                        <div className={styles.pageContainer}>
                            { hasPrevious && (
                                <Link to={`/posts?page=${currentPage - 1}`}>
                                    <button className={styles.previousBtn}>Previous</button>
                                </Link>
                            )}
                            <p>
                                Page of {currentPage} of {totalPages}
                            </p>
                            { hasNext && (
                                <Link to={`/posts?page=${currentPage + 1}`}>
                                    <button className={styles.nextBtn}>Next</button>
                                </Link>
                            )}
                        </div>
                    </div>
                )}

                <ConfirmModal
                    isOpen={!showConfirm}
                    message="Are you sure you want to delete this post?"
                    confirmText="Delete"
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
        </section>
    );
}
