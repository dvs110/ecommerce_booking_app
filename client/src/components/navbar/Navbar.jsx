import React, { useContext } from 'react'
import './navbar.css'
import { Link } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'
const Navbar = () => {
    const { user } = useContext(AuthContext)
    // console.log(user);
    return (
        <div className='navbar'>
            <div className="navcontainer">
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                    <span className='logo'>devangbooking</span>
                </Link>
                {user ? user.username : (<div className="navitems">
                    <button className='navbuttons'>Register</button>
                    <button className='navbuttons'>Login</button>
                </div>)}

            </div>

        </div>
    )
}

export default Navbar
