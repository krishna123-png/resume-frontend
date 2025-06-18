import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { AuthContext } from '../src/App'

export default function Login() {

    const navigate = useNavigate();
    const { user, setUser } = React.useContext(AuthContext)
    const [formData, setFormData] = React.useState({
        email: '',
        password: ''
    });

    function handleChange(e) {
        setFormData(prev => {
            return {
                ...prev,
                [e.target.id]: e.target.value
            }
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
                email: formData.email.trim(),
                password: formData.password.trim()
            });

            console.log(response.data);
            const token = response.data.token;
            localStorage.setItem('token', token);
            const decoded = jwtDecode(token);
            setUser(decoded)
            navigate('/');
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='login-page-wrapper'>
            <div className='login-page-container'>
                <h3 className='login-h3'>
                    Login To Your Account
                </h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='email'>
                        Email
                    </label>
                    <input type='email' id='email' required onChange={handleChange} />
                    <label htmlFor='password'>
                        Password
                    </label>
                    <input type='password' id='password' required onChange={handleChange} />
                    <button type='submit'>
                        Login
                    </button>
                </form>
                <p>
                    Don't have an account? <Link to='/register' className='register-link'>Register</Link>
                </p>
            </div>
        </div>
    )
}
