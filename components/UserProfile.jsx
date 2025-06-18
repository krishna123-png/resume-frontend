import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { AuthContext } from '../src/App'
import avatar from '../src/assets/user-icon.png';
import './UserProfile.css'

export const UserContext = React.createContext();

export default function UserProfile() {
    const { user } = React.useContext(AuthContext);
    const [profile, setProfile] = React.useState({
        fullName: '',
        email: ''
    })
    const [submissions, setSubmissions] = React.useState([]);
    const navigate = useNavigate();
    React.useEffect(() => {
        async function fetchUser() {
            const token = localStorage.getItem('token');
            if (!user && !token) {
                navigate('/register')
            }

            try {
                const { fullName, email } = (await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/details`, {
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                })).data.data;

                console.log(fullName, email);

                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/submissions/history`, {
                    headers : {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProfile({ fullName, email });
                setSubmissions(response.data.data);

            }
            catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    }, [])

    if (!profile.fullName || !profile.email) {
        return (
            <div className='wait-profile'>
                <p>
                    Loading...
                </p>
            </div>
        )
    }

    return (
        <div className='profile-wrapper'>
            <div className='profile-container'>
                <h2 className='profile-h2'>
                    Profile
                </h2>
                <div className='profile-card'>
                    <div className='image-section'>
                        <img src={avatar} alt='user-profile-photo' />
                        <h4 className='profile-h4'>
                            {profile.fullName.split(' ')[0] + " " + profile.fullName.split(' ')[profile.fullName.split(' ').length - 1]}
                        </h4>
                        <Link to='/profile/edit'><button>Edit Profile</button></Link>
                    </div>
                    <div className='user-description'>
                        <div className='name-email'>
                            <h3 className='profile-h3'>
                                {profile.fullName.split(' ')[0] + " " + profile.fullName.split(' ')[profile.fullName.split(' ').length - 1]}
                            </h3>
                            <p>
                                {profile.email}
                            </p>
                        </div>
                        <div className='submission-display'>
                            <h3 className='profile-h3'>
                                Submissions
                            </h3>
                            <table className='profile-table'>
                                <thead>
                                    <tr>
                                        <th>
                                            Title
                                        </th>
                                        <th>
                                            Date
                                        </th>
                                        <th>
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {submissions.map((submission) => {
                                        return (
                                            <tr key={submission._id}>
                                                <td>
                                                    {submission.jobRole}
                                                </td>
                                                <td>
                                                    {new Date(submission.createdAt).toLocaleDateString()}
                                                </td>
                                                <td>
                                                    <Link to={`/result/${submission._id}`} className='result-link'>
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}