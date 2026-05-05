import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router";

export default function Login(){
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState(null);

    function handleChange(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e){
        e.preventDefault();
        setError(null);

        try{
            await login(form);
            navigate("/");
        }catch(err){
            setError(err.message);
        }
    }

    return(
        <section className="login-section">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="login-header">Login Form</h2>
                {error &&  <p>{error}</p>}
                <label>
                    Email:
                    <input
                        name = "email"
                        type = "email"
                        placeholder= "email"
                        value = {form.email}
                        onChange= {handleChange}
                    />
                </label>

                <label>
                    Password:
                    <input 
                        name="password"
                        type="password"
                        placeholder="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit" className="login-btn">
                    Login
                </button>
            </form>
        </section>
    )
}
