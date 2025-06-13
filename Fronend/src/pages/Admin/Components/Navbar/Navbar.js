import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaDoorOpen } from "react-icons/fa6";
import { FaAmbulance } from 'react-icons/fa';
import './Navbar.css'; // Make sure this file exists
import { UserContext } from '../../../../core/contexts/UserContext';
import { logout } from '../../../../core/services/logout';

const titleText = "Welcome To HealthFirst";
function Navbar() {

   const { setUser } = useContext(UserContext);
    const navigate = useNavigate(); 

    const handleLogout = () => {
        logout(setUser, navigate)
    };

  return (
    <motion.nav
      className="navbar navbar-expand-lg navbar-light px-4 navbar-gradient"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Link className="navbar-brand d-flex align-items-center gap-3" to="/">
        {/* Continuously driving ambulance */}
        <motion.div
  animate={{ x: [0, 2, 0, -2, 0] }}
  transition={{ repeat: Infinity, duration: 0.4, ease: "linear" }}
>
  <FaAmbulance className="ambulance-icon" />
</motion.div>

        {/* Typing Animated Title */}
        <div className="typing-title">
          {titleText.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </Link>
      <div className="ms-auto">
        <button className="btn-logout" onClick={() => {
          console.log("Logout clicked");
          handleLogout();
        }}>
          <FaDoorOpen className="logout-icon" /> 
        </button>
      </div>
    </motion.nav>
  );
}

export { Navbar };
