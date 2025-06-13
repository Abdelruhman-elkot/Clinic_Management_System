import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import DoctorHeader from "./Components/DoctorHeader/Doctor_Header";
import DoctorBody from './Components/DoctorBody/DoctorBody';
import PatientFooter from "../../Patient/Home/Components/Footer/PatientFooter";

function DoctorHome() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <DoctorHeader />
      <div style={{ flex: 1 }}>
        <DoctorBody />
      </div>
      <PatientFooter />
    </div>
  );
}

export default DoctorHome;

