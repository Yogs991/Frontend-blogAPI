import { api } from "./client";

export const createComment = (postId, data)=>{
    return api(`/comments/${postId}`,{
        method: "POST",
        body: JSON.stringify(data)
    });
}

export const updateComment = (postId, commentId, data)=>{
    return api(`/comments/${postId}/comment/${commentId}`,{
        method: "PUT",
        body: JSON.stringify(data)
    });
};

export const deleteComment = (postId, commentId)=>{
    return api(`/comments/${postId}/comment/${commentId}`,{
        method: "DELETE"
    });
}