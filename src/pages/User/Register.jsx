import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router";

export default function Register(){
    const {register} = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState(null);

    function handleChange(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }
    
    async function handleSubmit(e){
        e.preventDefault();
        setError(null);

        try{
            await register(form);
            navigate("/");
        }catch(err){
            setError(err.message);
        }
    }

    return(
        <section className="register-section">
            <form onSubmit={handleSubmit} className="register-form">
                <h2 className="register-header">Register</h2>
                {error && <p>{error}</p>}
                <label>
                    Name:
                    <input
                        name = "name"
                        type = "name"
                        placeholder = "name"
                        value = {form.name}
                        onChange = {handleChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        name = "email"
                        type = "email"
                        placeholder = "email"
                        value = {form.email}
                        onChange = {handleChange}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        name = "password"
                        type = "password"
                        placeholder = "password"
                        value = {form.password}
                        onChange = {handleChange}
                        required
                    />
                </label>
                <button type="submit" className="register-btn">
                    Register
                </button>
            </form>
        </section>
    )
}