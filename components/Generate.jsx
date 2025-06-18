import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Generate.css'
import axios from 'axios'

export default function Generate() {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        jobRole: '',
        skills: '',
        experience: '',
        education: ''
    })

    const [isGenerating, setIsGenerating] = React.useState(false);

    function handleChange(e) {
        setFormData(prev => {
            return {
                ...prev,
                [e.target.id]: e.target.value
            }
        })
    }

    async function handleSubmit(e) {
        setIsGenerating(true);
        e.preventDefault();
        const skillsArray = formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
        const data = {
            jobRole: formData.jobRole,
            skills: skillsArray,
            experience: formData.experience,
            education: formData.education
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/submissions/generate`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const { resume, coverLetter, submissionId } = response.data.data;
            localStorage.setItem("resultData", JSON.stringify({ resume, coverLetter, submissionId}))
            navigate(`/result/${submissionId}`);
            setIsGenerating(false);
        }
        catch(error) {
            console.log(error);
            alert('Failed to generate. Please try again');
        }
    }
 
    return (
        isGenerating ? 
        <div className='wait-generate'>
            <p>
                Generating...
            </p>
        </div>
        :
        <div className='generate-page-wrapper'>
            <div className='generate-page-container'>
                <h2 className='generate-h2'>
                    AI Resume & Cover Letter Generator
                </h2>
                <p>
                    Fill out the form below to generate your resume and cover letter.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className='choice'>
                        <h4 className='generate-h4'>
                            What would you like to create?
                        </h4>
                        <p className='options'>
                            <span className='option resume'>Resume</span>
                            <span className='option cover-letter'>Cover Letter</span>
                        </p>
                    </div>
                    <div className='input'>
                        <label htmlFor='jobRole'>Job Role</label>
                        <input type='text' id='jobRole' required onChange={handleChange} />
                    </div>
                    <div className='input'>
                        <label htmlFor='skills'>Skills</label>
                        <input type='text' id='skills' required onChange={handleChange} />
                    </div>
                    <div className='input'>
                        <label htmlFor='experience'>Experience</label>
                        <input type='text' id='experience' required onChange={handleChange} />
                    </div>
                    <div className='input'>
                        <label htmlFor='education'>Education</label>
                        <input type='text' id='education' required onChange={handleChange} />
                    </div>
                    <button type='submit'>
                        Generate
                    </button>
                </form>
            </div>
        </div>
    )
}



//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