import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 text-center">
            <div>
                <h1 className="mb-4">Welcome to TaskPro</h1>
                <div className="d-flex justify-content-center gap-3">
                    <Link to="/register" className="btn btn-primary">
                        Register
                    </Link>
                    <Link to="/login" className="btn btn-outline-primary">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
