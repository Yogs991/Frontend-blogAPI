import { api } from "./client";

const getPost = (params={})=>{
    const query = new URLSearchParams(params).toString();
    const endpoint = query? `/post?${query}` : "/post";
    return api(endpoint);
}

const createPost = (data)=>{
    return api("/post",{
        method: "POST",
        body: JSON.stringify(data),
    })
};

const updatePost = (postId, data)=>{
    return api(`/post/${postId}`,{
        method: "PUT",
        body: JSON.stringify(data)
    });
}

const deletePost = (postId)=>{
    return api(`/post/${postId}`,{
        method: "DELETE"
    });
}

const getCommentsForPost = (postId)=>{
    return api(`/post/${postId}/comments`);
}

const getCommentById = (postId, commentId)=>{
    return api(`/post/${postId}/comments/${commentId}`);
}

export default {
    getPost,
    createPost,
    updatePost,
    deletePost,
    getCommentsForPost,
    getCommentById
};