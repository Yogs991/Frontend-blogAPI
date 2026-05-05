import {api} from './client';

export const getCurrentUser = ()=>{
    return api("/user/me");
}

export const getSinglePostByUser = (userId, postId)=>{
    return api(`/user/${userId}/posts/${postId}`);
}

export const getPostsByUser = (userId)=>{
    return api(`/user/${userId}/posts`);
}

export const getAllUsers = ()=>{
    return api('/user');
}

export const deleteUser = (userId)=>{
    return api(`/user/${userId}`,{
        method: "DELETE",
    })
}