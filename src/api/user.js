import {api} from './client';

const getCurrentUser = ()=>{
    return api("/user/me");
}

const getSinglePostByUser = (userId, postId)=>{
    return api(`/user/${userId}/posts/${postId}`);
}

const getPostsByUser = (userId)=>{
    return api(`/user/${userId}/posts`);
}

const getAllUsers = ()=>{
    return api('/user');
}

const deleteUser = (userId)=>{
    return api(`/user/${userId}`,{
        method: "DELETE",
    })
}

export default {getCurrentUser, getSinglePostByUser, getPostsByUser, getAllUsers, deleteUser}