import { api } from "./client";

export const register = async(data)=>{
    const res = await api("/user/register",{
        method: "POST",
        body: JSON.stringify(data),
    });

    if(res.token){
        localStorage.setItem("token", res.token);
    }

    return res;
}

export const login = async(data)=>{
    const res = await api("/user/login",{
        method: "POST",
        body: JSON.stringify(data),
    });

    if(res.token){
        localStorage.setItem("token", res.token);
    }

    return res;
}

export const logout = ()=>{
    localStorage.removeItem("token");
}