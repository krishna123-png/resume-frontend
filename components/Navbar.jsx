import React from 'react'
import { Link, useLocation, Outlet, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../src/App'
import './Navbar.css'

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(AuthContext);
  const token = localStorage.getItem('token');
  const location = useLocation();
  const currentPath = location.pathname;

  function handleLogOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('resultData')
    setUser(null)
    navigate('/');

  }

  if (!user && !token) {
    return (
      <>
        <nav className='nav-link'>
          <div>
            <NavLink to='login'>Login</NavLink>
          </div>
        </nav>
        <Outlet />
      </>
    )
  }

  else {
    if (currentPath === '/') {
      return (
        <>
          <nav className='home-page-nav-link'>
            <div>
              <NavLink to='submissions'>History</NavLink>
              <NavLink to='profile'>Profile</NavLink>
              <button onClick={handleLogOut}>Logout</button>
            </div>
          </nav>
          <Outlet />
        </>
      )
    }

    if (currentPath === '/generate') {
      return (
       <>
         <nav className='generate-page-nav-link'>
          <div>
            <NavLink to="/">Home</NavLink>
            <NavLink to='profile'>Profile</NavLink>
          </div>
         </nav>
        <Outlet />
       </>
      )
    }

    if (currentPath.startsWith('/result')) {
      return (
          <>
            <nav className='result-page-nav-link'>
              <div>
                <NavLink to="/">Home</NavLink>
                <NavLink to='submissions'>History</NavLink>
                <NavLink to='profile'>Profile</NavLink>
              </div>
            </nav>
            <Outlet />
          </>
      )
    }

    if (currentPath === '/submissions') {
      return (
        <>
          <nav className='submission-page-nav-link'>
            <div>
              <NavLink to="/">Home</NavLink>
              <NavLink to='profile'>Profile</NavLink>
            </div>
          </nav>
          <Outlet />
        </>
      )
    }

    if (currentPath === '/profile') {
      return (
        <>
            <nav className='profile-page-nav-link'>
              <div>
                <NavLink to='submissions'>History</NavLink>
                <NavLink to='/'>Home</NavLink>
                <button onClick={handleLogOut}>Logout</button>
              </div>
            </nav>
            <Outlet />
        </>
      )
    }
  }
}




