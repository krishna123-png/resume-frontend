import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './EditProfile.css'

export default function EditProfile() {
    const [formData, setFormData] = React.useState({
        fullName: '',
        email: '',
        password: ''
    });
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    React.useEffect(() => {
        async function fetchUser() {
            if (!token) {
                navigate('/login');
            }
            try {
                const { fullName, email } = (await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/details`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })).data.data;

                setFormData((prev) => {
                    return {
                        ...prev,
                        fullName: fullName,
                        email: email
                    }
                });
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    }, []);

    function handleChange(e) {
        setFormData((prev) => {
            return {
                ...prev,
                [e.target.id]: e.target.value
            }
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/auth/update`, {
                fullName: formData.fullName.trim(),
                password: formData.password.trim()
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response.data.data)
            navigate('/profile');
        }
        catch (error) {
            console.log(error);
        }
    }

    console.log(formData)

    return (
    <div className='edit-profile-wrapper'>
      <div className='edit-profile-container'>
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='fullName'>Full Name</label>
          <input
            type='text'
            id='fullName'
            name='fullName'
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            disabled
          />

          <label htmlFor='password'>New Password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
          />

          <button type='submit'>Save Changes</button>
        </form>
      </div>
    </div>
    )
}
