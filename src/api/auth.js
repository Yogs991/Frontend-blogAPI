import { api } from "./client";

const register = async(data)=>{
    const res = await api("/register",{
        method: "POST",
        body: JSON.stringify(data),
    });

    if(res.token){
        localStorage.setItem("token", res.token);
    }

    return res;
}

const login = async(data)=>{
    const res = await api("/login",{
        method: "POST",
        body: JSON.stringify(data),
    });

    if(res.token){
        localStorage.setItem("token", res.token);
    }

    return res;
}

const logout = ()=>{
    localStorage.removeItem("token");
}

export default {register, login, logout}