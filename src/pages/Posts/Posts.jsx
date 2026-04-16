import { useEffect, useState } from "react";
import {Link, useSearchParams} from "react-router";
import {getPost} from "../../api/posts";
import {useAuth} from "../../context/useAuth";

export default function Posts(){
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const {isAuthenticated} = useAuth();

    useEffect(()=>{
        const fetchPosts = async({page, limit: 5})=>{
            try {
                setLoading(true);
                const data = await getPost();
            } catch (error) {
                console.log(error);
            }
        }
    },[page])
}