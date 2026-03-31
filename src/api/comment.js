import { api } from "./client";

const getCommentsByPost = (postId)=>{
    return api(`/comments/${postId}`);
}

const updateComment = (postId, commentId, data)=>{
    api(`/comments/${postId}/comments/${commentId}`,{
        method: "PATCH",
        body: JSON.stringify(data)
    });
};

const deleteComment = (postId, commentId)=>{
    api(`/comments/${postId}/${commentId}`,{
        method: "DELETE"
    });
}

export default {getCommentsByPost, updateComment, deleteComment};