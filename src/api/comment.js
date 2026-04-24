import { api } from "./client";

const createComment = (postId, data)=>{
    return api(`/comments/${postId}`,{
        method: "POST",
        body: JSON.stringify(data)
    });
}

const updateComment = (postId, commentId, data)=>{
    return api(`/comments/${postId}/comment/${commentId}`,{
        method: "PUT",
        body: JSON.stringify(data)
    });
};

const deleteComment = (postId, commentId)=>{
    return api(`/comments/${postId}/comment/${commentId}`,{
        method: "DELETE"
    });
}

export default {
    createComment,
    updateComment,
    deleteComment
};