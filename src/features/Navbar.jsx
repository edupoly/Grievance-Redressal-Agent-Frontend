import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Zonalroutes from './routes/Zonalroutes';
import Principalroutes from './routes/Principalroutes';
import Customerroutes from './routes/Customerroutes';
import Adminroutes from './routes/Adminroutes';

function Navbar() {
    var navigate = useNavigate();
    var [routes,setRoutes] = useState([]);
    var [role,setRole] = useState(window.localStorage.getItem('role') || '');
    var rolee = window.localStorage.getItem('role');

    function logout(){
        window.localStorage.clear();
        setRole('');
        navigate('/');
        setRoutes([]);
    }
    useEffect(()=>{
        console.log("rolee",rolee);
        if(rolee){
            switch(rolee){
                case "zonalofficer" :
                    setRoutes(Zonalroutes);
                    break;
                case "principal" : 
                    setRoutes(Principalroutes);
                    break;
                case "Customercare" : 
                    setRoutes(Customerroutes);
                    break;
                case "Admin" :
                    setRoutes(Adminroutes);
                    break;
                default : 
                    navigate('/login');
                    break;               
            }
        } else {
            navigate('/login')
        }
    },[routes,rolee])
  return (
    <div>
        <nav className="navbar navbar-expand-lg shadow-lg sticky-top" 
            style={{
                background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                padding: '15px 0'
            }}>
            <div className="container-fluid">
                <div className="d-flex align-items-center">
                    <i className="bi bi-building-fill text-warning display-6 me-2"></i>
                    <h5 className='mb-0 text-white fw-bold'>
                        International School
                        <span className="d-block fs-6 fw-light text-warning opacity-75">Excellence in Education</span>
                    </h5>
                </div>

                <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" 
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                    aria-expanded="false" aria-label="Toggle navigation">
                    <i className="bi bi-list text-primary"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto me-4 mb-2 mb-lg-0">
                        {routes.map((route, i) => (
                            route.path !== '/login' ? (
                                <li key={i} className='nav-item'>
                                    <NavLink to={route.path} 
                                        className={({isActive}) => 
                                            `nav-link px-3 py-2 mx-1 rounded-pill ${isActive ? 'bg-white text-primary' : 'text-white'}`
                                        }>
                                        <i className={`bi ${getRouteIcon(route.label)} me-2`}></i>
                                        {route.label}
                                    </NavLink>
                                </li>
                            ) : null
                        ))}
                    </ul>
                    <button onClick={logout} 
                        className="btn btn-outline-warning rounded-pill px-4 d-flex align-items-center">
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    </div>
  )
}

// Add this helper function at the top of your file
function getRouteIcon(label) {
    switch(label.toLowerCase()) {
        case 'add zonalofficer': return 'bi-person-plus-fill';
        case 'add branch': return 'bi-building-add';
        case 'add customercare': return 'bi-headset';
        case 'complaints': return 'bi-chat-left-text-fill';
        case 'dashboard': return 'bi-speedometer2';
        default: return 'bi-circle';
    }
}

export default Navbar
