import React, { useEffect } from "react";
import DoctorHeader from "../DoctorHome/Components/DoctorHeader/Doctor_Header";
import TitleWithHr from "../../../core/components/TitleWithHr/TitleWithHr";
import PatientMgBody from "./Components/PatientMgBody/PatientMgbody";
import PatientFooter from "../../Patient/Home/Components/Footer/PatientFooter";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./Patient_manag.module.css"; 

function PatientManagmentPage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className={styles.pageWrapper}> 
      <DoctorHeader />
      <main className={styles.pageMain}>
        <TitleWithHr fontSize="28px" title="Patient Management" data-aos="fade-down" />
        <PatientMgBody />
      </main>
      <PatientFooter />
    </div>
  );
}

export default PatientManagmentPage;
