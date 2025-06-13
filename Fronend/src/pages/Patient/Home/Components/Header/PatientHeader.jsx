import React , { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink,  useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './navbar.css';
import { logout } from '../../../../../core/services/logout';
import { UserContext } from '../../../../../core/contexts/UserContext';
function PatientHeader() {

    const { setUser } = useContext(UserContext);
    const navigate = useNavigate(); 

    const handleLogout = () => {
        logout(setUser, navigate);
    };
    
    return (
        <Navbar expand='lg' className='py-3 shadow-sm navbar'>
            <Container>
                <Navbar.Brand href='' className='fw-bold text-white'>
                <i class="fa-solid fa-truck-medical fa-bounce" style={{ marginRight: '8px' }}></i>
               
                    HealthFirst

                
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mx-auto'>
                        <Nav.Link as={NavLink} to='/patient/home'>Home</Nav.Link>
                        <Nav.Link as={NavLink} to='/chats'>Chats</Nav.Link>
                        <Nav.Link as={NavLink} to='/patient/viewdoctors'>Doctors</Nav.Link>
                        <Nav.Link as={NavLink} to='/patient/medicalHistory'>Medical History</Nav.Link>
                    </Nav>
                    <Button variant='outline-light' onClick={handleLogout}>Log Out</Button>
                </Navbar.Collapse>
            </Container>
            
        </Navbar>
    );
}

export default PatientHeader;