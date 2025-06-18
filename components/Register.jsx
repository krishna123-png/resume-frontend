import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../src/App';

export default function Register() {

    const navigate = useNavigate();

    const {user, setUser} = React.useContext(AuthContext)

    const [formData, setFormData] = React.useState({
        fullName: '',
        email: '',
        password: '',
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
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password
            });
            const token = response.data.token;
            localStorage.setItem('token', token);
            const decoded = jwtDecode(token);
            setUser(decoded)
            navigate('/');
        }
        catch(err) {
            console.error(err);
        }
    }

    return (
        <div className='register-page-wrapper'>
            <div className='register-page-container'>
                <h3 className='register-h3'>Create An Account</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='fullName'>Full Name</label>
                    <input type='text' id='fullName' required onChange={handleChange}/>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' required onChange={handleChange}/>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' required onChange={handleChange}/>
                    <button type='submit'>Register</button>
                </form>
                <p className='login-message'>
                Already have an account? <Link to='/login' className='login-page-link'>Login</Link>
                </p>
            </div>
        </div>
    )
}
