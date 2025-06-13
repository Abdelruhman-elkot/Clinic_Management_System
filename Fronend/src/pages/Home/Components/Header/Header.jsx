import { Navbar, Container, Button } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Header.css'
import {  useNavigate } from 'react-router-dom';

function MainHeader() {
    const navigate = useNavigate();

    return (
        <Navbar expand='lg' className='py-3 shadow-sm navbar'>
            <Container>
                <Navbar.Brand href='' className='fw-bold text-white'>
                <i class="fa-solid fa-truck-medical fa-bounce" style={{ marginRight: '8px' }}></i>
                    HealthFirst
                </Navbar.Brand>
                <Button variant='outline-light' onClick={() => navigate('/signup')}>Get Started</Button>
            </Container>
            
        </Navbar>
    );

}

export default MainHeader;