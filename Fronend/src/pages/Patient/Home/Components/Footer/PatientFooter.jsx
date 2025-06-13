import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function PatientFooter () {
    return(
        
        <footer className='text-white py-2' style={{background :'linear-gradient(to right, #0097B8, #0084A1, #01748E, #00586B, #014C5D, #023B47)' }}>
            <div className='container d-flex justify-content-between align-items-center'>
                
                <p className='mb-0'>&copy; 2025 Clinic System. All rights reserved.</p>
                <p className='mb-0'>Follow us on:
                <a href="https://facebook.com" className="text-white ms-2">
                    <i className="fab fa-facebook"></i>
                </a>
                <a href="https://twitter.com" className="text-white ms-2">
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="https://linkedin.com" className="text-white ms-2">
                    <i className="fab fa-linkedin"></i> 
                </a>
                </p>
            </div>
        </footer>
    );
}

export default PatientFooter;