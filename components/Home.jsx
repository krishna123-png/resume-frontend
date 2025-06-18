import React from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../src/App"
import './Home.css'
import image from '../'

export default function Home() {
    const { user } = React.useContext(AuthContext);
    return (
        <div className='home-page-container'>
            <section className='header'>
                <section className='heading-para-button'>
                    <h1 className="home-h1">
                        Generate Your Resume & Cover Letter In Seconds
                    </h1>
                    <p className="home-p">
                        Create a professional resume and cover letters, effortlessly with our Ai-powered tools, Just enter your details, ad let our technology do the rest.
                    </p>
                    {
                        user ?
                        <Link to='/generate' className='generate-page-link'>Get Started</Link> :
                        <Link to='/register' className='register-page-link'>Get Started</Link>
                    }
                </section>
                <section className='image'>
                    <img src='../src/assets/ResumePDF.jpg' alt='logo' />
                </section>
            </section>
            <section className='description'>
                <section className='ai-powered'>
                    <div className="header-holder">
                        <img src="../src/assets/Aipowered.jpg" alt='ai-image' />
                        <h3 className="home-h3">
                            Ai Powered
                        </h3>
                    </div>
                    <p className="home-p">
                        Leverege advanced ai to generate tailored resumes and cover letters.
                    </p>
                </section>
                <section className='pdf-download'>
                    <div className="header-holder">
                        <img src="../src/assets/instantPDFdownload.jpg" alt='download-icon' />
                        <h3 className="home-h3">
                            Instant PDFDownload
                        </h3>
                    </div>
                    <p className="home-p">
                        Download your documents as PDF files safely after generation
                    </p>
                </section>
                <section className="email-integration">
                    <div className="header-holder">
                        <img src="../src/assets/Email-Integration.jpg" alt="email-icon" />
                        <h3 className="home-h3">
                            Email Integration
                        </h3>
                    </div>
                    <p className="home-p">
                        Recieve your generated resume and cover letter directly via email.
                    </p>
                </section>
            </section>
        </div>
    )
}
