import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import pateinthome from '../../../assets/images/patient1.png'
import aboutPatient from '../../../assets/images/2.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
import PatientFooter from './Components/Footer/PatientFooter';
import PatientHeader from './Components/Header/PatientHeader';
import PatientServices from './Components/PatientServices/PatientServices';
import './patiens.css'
import Colors from '../../../core/Constants/Colors'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function PatientHome() {

    const navigate = useNavigate();


    useEffect(() => {
        AOS.init({
          duration: 1000, // animation duration in ms
          once: true,     // animate only once
        });
    }, []);

    const aboutUsSentences = [
        { text: 'Access Your Medical History', icon: 'fa-solid fa-book-medical' },
        { text: 'Book Appointments with Doctors', icon: 'fa-solid fa-calendar-check' },
        { text: 'Experienced and Friendly Doctors', icon: 'fa-solid fa-user-doctor' },
        { text: '24 Hours Support', icon: 'fa-solid fa-headset' },
        ];

    return(
        <div className='main'>
        <PatientHeader></PatientHeader>
        
{/* Main Home Section */}
        <section  id='home' className='bg-light py 5'>
            <Container>
                <Row className='align-items-center'>
                    <Col md={6} data-aos="fade-right">
                        <h1 className='fw-bold mb-4' style={{color: Colors.textPrimary}}>
                            Your Health, Our Priority
                        </h1>
                        <p className="text-muted mb-4" style={{color: Colors.textMuted}}>
                        At our clinic, you can easily view your medical history and book appointments with our skilled doctors. We aim to provide a seamless healthcare experience right from your screen.
                        </p>
                        <Button size="lg" style={{background: Colors.primary}} onClick={() => navigate('/patient/viewdoctors')}>Make An Appointment</Button>
                    </Col>
                    <Col md={6} data-aos="fade-left">
                    <img src={pateinthome} alt="Doctor and Patient" className="img-fluid" />
                    </Col>
                </Row>
            </Container>
        </section>
        
        <PatientServices></PatientServices>
{/* About us Section */}
        <section id='about' className='bg-light py-5'>
            <Container>
                <Row className='align-items-center'>
                    <Col md={6} data-aos="zoom-in">
                        <img src ={aboutPatient} alt='About Us' className='img-fluid' />
                    </Col>
                    <Col md={6} data-aos="fade-up">
                        <h2 className='fw-bold mb-4' style={{color: Colors.textPrimary}}>About Our Clinic</h2>
                        <p className='text-muted mb-4' style={{color: Colors.textMuted}}>
                        We are dedicated to providing high-quality healthcare services with a focus on patient convenience. Our clinic allows you to access your medical history and book appointments with our expert doctors.
                        </p>
                        <p className='text-muted' style={{color: Colors.textMuted}}>
                        Our state-of-the-art facilities and experienced staff ensure that your visit is as comfortable and efficient as possible. We are committed to helping you take control of your health.
                        </p>
                        {/* <Button variant="outline-primary">Learn More</Button> */}
                        <div className="container mt-4">
                        <div className="row">
                            {aboutUsSentences.map((item, index) => (
                            <div className="col-6 mb-3" key={index}>
                                <div className="d-flex align-items-center">
                                <i className={`${item.icon} me-2`} style={{color: Colors.primary}}></i>
                                <span className='small fw-bold' style={{color: Colors.secondaryDark}}>{item.text}</span>
                                </div>
                            </div>
                            ))}
                        </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        
        <PatientFooter></PatientFooter>
        </div>
    );
}

export default PatientHome;