import React from 'react'
import {  useNavigate } from 'react-router-dom';
import icon from '../../assets/icon.png'
import "../../App.css";


const Navbar = () => {
  const navigate = useNavigate();
  // const { projectId } = useParams();
  const lastProjectId = localStorage.getItem("lastProjectId");


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold d-flex align-items-center" href="/">
          <img
            src={icon}
            alt="TaskManager Icon"
            width="30"
            height="30"
            className="me-2"
          />
          TaskPro
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-3">
            <li className="nav-item">
              <a className="nav-link" href="/projects">Projects</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={`/projects/${lastProjectId}/tasks`}>Tasks</a>
            </li>
          </ul>

          <div className="ms-auto">
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

  )
}

export default Navbar;