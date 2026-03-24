const API_BASE_URL = 'http://localhost:3000/api';

const api  = async (endpoint, options = {})=>{
    const token =  localStorage.getItem("token");
    const res = await fetch(`${API_BASE_URL}${endpoint}`,{
        headers:{
            "Content-Type": "application/json",
            ...(token && {Authorization: `Bearer ${token}`}),
            ...options.headers,
        },
        ...options
    });

    if(!res.ok){
        const error = await res.json().catch(()=>null);
        const message = error?.message || "API request failed";
        throw new Error(message);
    }

    if(res.status === 204) return null;
    
    return res.json();
}

export default {api};