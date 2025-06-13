
import React from 'react';
import image from '../../assets/images/error.png';
import './Error.css';
import { useNavigate } from 'react-router-dom';


function ErrorAccessDeniedPage() {
    
    const navigate = useNavigate();
    return (
        <div className="container py-5 mt-5">
        <div className="row align-items-center gy-5">
            <div className="col-12 d-sm-none text-center">
            <img src={image} alt="Not Found" className="img-fluid mobileImage" />
            </div>

            <div className="col-12 col-sm-6">
            <h1 className="fw-bold display-6 mb-3 title">Access Denied...</h1>
            <p className="text-muted fs-5">
            You do not have permission to view this page. If you believe this is a mistake, please contact support.
            </p>
            <button className="btn  btn-md mt-4 w-100 w-sm-auto" style={{ color: 'white', background :'linear-gradient(to right, #0097B8, #0084A1, #01748E, #00586B, #014C5D, #023B47)' }} onClick={() => navigate("/")}>
                Get back to home page
            </button>
            </div>

            <div className="col-12 col-sm-6 d-none d-sm-block text-center">
            <img src={image} alt="Not Found" className="img-fluid desktopImage" />
            </div>
        </div>
        </div>
    );
}

export default ErrorAccessDeniedPage;