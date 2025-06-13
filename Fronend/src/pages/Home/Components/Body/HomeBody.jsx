import { Container, Row, Col, Button } from 'react-bootstrap';
import Colors from '../../../../core/Constants/Colors'
import nurse from '../../../../assets/images/nurse.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomeBody() {
    
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({
          duration: 1000, // animation duration in ms
          once: true,     // animate only once
        });
    }, []);


    return(
        <section  id='home' className='bg-light py 5'>
            <Container>
                <Row className='align-items-center'>
                    <Col md={6} data-aos="fade-right">
                        <h1 className='fw-bold mb-4' style={{color: Colors.textPrimary}}>
                        Get Started with Your Healthcare Journey
                        </h1>
                        <p className="text-muted mb-4" style={{color: Colors.textMuted}}>
                        Sign up or sign in to access your medical history, connect with expert doctors, and manage your appointments—all in one place.
                        </p>
                        
                        <Button size="lg" className="me-3" style={{background: Colors.primary}} onClick={() => navigate('/signup')}>Sign Up</Button>
                        <Button size="lg" style={{background: Colors.primary}} onClick={() => navigate('/signin')}>Log in</Button>

                     
                    </Col>
                    <Col md={6} data-aos="fade-left">
                    <img src={nurse} alt="Doctor and Patient" className="img-fluid" />
                    </Col>
                </Row>
            </Container>
        </section>

    );

}

export default HomeBody;