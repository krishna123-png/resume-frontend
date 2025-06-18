import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Home from '../components/Home.jsx'
import Register from '../components/Register.jsx'
import Login from '../components/Login.jsx'
import Generate from '../components/Generate.jsx'
import Result from '../components/Result.jsx'
import Submissions from '../components/Submissions.jsx'
import UserProfile from '../components/UserProfile.jsx'
import NotFound from '../components/NotFound.jsx'
import SubmissionLayout from '../layouts/SubmissionLayout.jsx'
import AuthLayout from '../layouts/AuthLayout.jsx'
import { jwtDecode } from 'jwt-decode'
import EditProfile from '../components/EditProfile.jsx'


export const AuthContext = React.createContext();

export default function App() {

  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    console.log('useEffect ran');
    console.log(user);
    const token = localStorage.getItem('token');
    if (token && !user) {
      try {
        const decoded = jwtDecode(token)
        setUser(decoded)
      }
      catch {
        setUser(null)
      }
    }
  }, []);

  console.log(user)

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{user, setUser}}>
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path='generate' element={<Generate />} />
            <Route path='result/:id' element={<Result />} />
            <Route path='submissions' element={<Submissions />} />
            <Route path='profile' element={<UserProfile />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile/edit' element={<EditProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  )
}
