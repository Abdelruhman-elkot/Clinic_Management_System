import React, { useContext} from 'react';
import {  useNavigate } from 'react-router-dom';
import { FaPowerOff } from 'react-icons/fa';
import { Container, Button } from 'react-bootstrap';
import Headerstyle from './Doctor_Header.module.css';
import { logout } from '../../../../../core/services/logout'
import { UserContext } from '../../../../../core/contexts/UserContext';
function DoctorHeader() {

  const { setUser } = useContext(UserContext)
  const navigate = useNavigate();
  
  const handleLogout = () => {
      logout(setUser, navigate);
  };

  return (
    <>
    <Container fluid className={Headerstyle.headerContainer}>

      
      <i className={`fa-solid fa-truck-medical ${Headerstyle.truckIcon}`}></i>
      <p style={{fontSize: '25px', fontWeight: 'bold', color: 'white', paddingTop: '15px', paddingLeft: '10px'}}>
      HealthFirst
      </p>

      <Button variant="link" className={Headerstyle.headerButton} onClick={handleLogout}>
        <FaPowerOff className={Headerstyle.powerIcon} />
      </Button>

      
    </Container>
    <hr className={Headerstyle.headerhr} />
    </>
    
  );
}

export default DoctorHeader;
