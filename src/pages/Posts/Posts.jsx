import { useEffect, useState } from "react";
import {Link, useSearchParams} from "react-router";
import {useAuth} from "../../context/useAuth.js";
import {getPost} from "../../api/posts.js";
import {createComment} from "../../api/comment.js";
import truncateContent from "../../functions/truncate.js";
import styles from './Posts.module.css';

export default function Posts(){
    const [posts, setPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;

    const [commentText, setCommentText] = useState({});
    const [submitError, setSubmitError] = useState({});

    const { isAuthenticated } = useAuth();

    useEffect(()=>{
        const fetchPosts = async ()=>{
            try {
                setLoading(true);
                const data = await getPost({page, limit: 5});
                // console.log(data);
                setPosts(Array.isArray(data.data) ? data.data : []);
                setTotalPages(data.totalPages);
                setCurrentPage(data.currentPage);
            } catch (error) {
                setError(error.message);
            }finally{
                setLoading(false);
            }
        };

        fetchPosts();
    },[page]);

    const handleSubmitComment = async (postId)=>{
        try{
            await createComment(postId, {content: commentText[postId]});

            setCommentText((prev)=>({
                ...prev,
                [postId]: "",
            }));

            const data = await getPost({page, limit: 5});
            setPosts(Array.isArray(data.data) ? data.data : []);
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
        }catch(err){
            setSubmitError((prev)=>({
                ...prev,
                [postId]: err.message,
            }));
        }
    };

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error: {error}</p>;

    const hasPrevious = currentPage > 1;
    const hasNext = currentPage < totalPages;
    const maxPost = 100;
    const maxComment = 100;

    return(
        <section className={styles.postSection}>
            {currentPage > 1 && (
                <h3 className={styles.pageNumHeader}>
                    Page {currentPage} of {totalPages}
                </h3>
            )}

            {posts.map((post)=>{
                const createdDate = new Date(post.createdAt).toLocaleString("en-GB");
                const postIsTruncated = post.content.length > maxPost;

                return(
                    <div key={post.id} className={styles.postContainer}>
                        <Link to={`/posts/${post.id}`}>
                            <h2 className={styles.postTitle}>{post.title}</h2>
                        </Link>

                        <div className={styles.postContentContainer}>
                            <p className={styles.postContent}>
                                { postIsTruncated ? truncateContent(post.content, maxPost): post.content }
                            </p>
                            <p className={styles.postDate}>
                                {createdDate}
                            </p>
                        </div>

                        <Link to={`/post/${post.id}`} className={styles.truncatedPostLink}>
                            <button className="truncated-post-btn">Show more</button>
                        </Link>

                        {/* comment section below */}
                        <div className={styles.commentsContainer}>
                            <h4 className={styles.commentsHeader}>Comments</h4>
                        
                            {post.comments.length === 0 && (
                                <p className={styles.noComments}>
                                    This post does not have any comments yet.
                                </p>
                            )}

                            {isAuthenticated && (
                                <div className={styles.submitCommentContainer}>
                                    <h4 className={styles.submitCommentHeader}>
                                        Submit comment
                                    </h4>

                                    <textarea
                                        value={commentText[post.id] || ""}
                                        onChange={(e)=>
                                            setCommentText((prev)=>({
                                                ...prev,
                                                [post.id]: e.target.value,
                                            }))
                                        }
                                        placeholder="Write your comment..."
                                        rows={4}
                                        className={styles.commentTextarea}
                                    />

                                    <button onClick={()=>handleSubmitComment(post.id)} className={styles.submitCommentBtn}>
                                        Submit
                                    </button>
                                    
                                    {submitError[post.id] && <p>Error: {submitError[post.id]}</p>}
                                </div>
                            )}
                            
                            {post.comments.map((comment)=>{
                                const createdDate = new Date().toLocaleString("en-GB");
                                const username = comment.author.username;
                                const commentIsTruncated = comment.content.length > maxComment;
                                
                                return (
                                    <div key={comment.id} className={styles.commentContainer}>
                                        <Link to={`/comments/${post.id}/${comment.id}`}>
                                            <h4>{username}</h4>
                                        </Link>
                                        <p>
                                            {commentIsTruncated ? truncateContent(comment.content, maxComment): comment.content}
                                        </p>
                                        <p className={styles.dateCreated}>
                                            {createdDate}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* <Link to={`/posts/${post.id}`} className= {styles.postDetailsLink}>
                            <button className="post-details-btn">Show more</button>
                        </Link> */}
                    </div>
                );
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
        </section>
    );
}