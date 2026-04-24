import { useState, useEffect } from "react";
import * as api from "../api/auth";
import { getCurrentUser } from "../api/user";
import { AuthContext } from "./authContext";

export function AuthProvider({children}){
    const [token, setToken] = useState(()=>localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = ()=>{
        api.logout();
        setToken(null);
        setUser(null);
    }

    useEffect(()=>{
        async function initializeAuth(){
            if(!token){
                setLoading(false);
                return;
            }
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
            } catch {
                logout()
            } finally {
                setLoading(false);
            }
        }

        initializeAuth();
    },[token]);

    return(
        <AuthContext.Provider
            value = {{
                token,
                user,
                loading,
                isAuthenticated: user,
                isAdmin: user?.isAdmin === true,
                login: async (data)=>{
                    const res = await api.login(data);
                    if(res?.token) setToken(res.token);
                    return res;
                },
                register: async(data)=>{
                    const res = await api.register(data);
                    if(res?.token) setToken(res.token);
                    return res;
                },
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}