import { api } from "./client";

const createComment = (postId, data)=>{
    api(`/comments/${postId}`,{
        method: "POST",
        body: JSON.stringify(data)
    });
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

export default {
    createComment,
    updateComment,
    deleteComment
};