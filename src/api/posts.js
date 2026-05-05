import { api } from "./client";

export const getPost = (params={})=>{
    const query = new URLSearchParams(params).toString();
    const endpoint = query? `/post?${query}` : "/post";
    return api(endpoint);
}

export const createPost = (data)=>{
    return api("/post",{
        method: "POST",
        body: JSON.stringify(data),
    })
};

export const updatePost = (postId, data)=>{
    return api(`/post/${postId}`,{
        method: "PUT",
        body: JSON.stringify(data)
    });
}

export const deletePost = (postId)=>{
    return api(`/post/${postId}`,{
        method: "DELETE"
    });
}

export const getCommentsForPost = (postId)=>{
    return api(`/post/${postId}/comments`);
}

export const getCommentById = (postId, commentId)=>{
    return api(`/post/${postId}/comments/${commentId}`);
}