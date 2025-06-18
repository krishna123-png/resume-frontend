import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import './Submissions.css'

export default function Submissions() {
    const [submissions, setSubmissions] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();

    React.useEffect(() => {
        async function fetchSubmissions() {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/register')
            }
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/submissions/history`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data.data);
                setSubmissions(response.data.data);
                setLoading(false);
                console.log(submissions);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchSubmissions();
    }, []);

    if (loading) {
        return (
            <div className='wait-submission'>
                <p>
                    Loading...
                </p>
            </div>
        )
    }

    else {
        return (
        <div className='submissions-wrapper'>
            <h2 className='sub-h2'>
                Submission History
            </h2>
            <div className='submission-table'>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Action</th>
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
    )
    }
}
