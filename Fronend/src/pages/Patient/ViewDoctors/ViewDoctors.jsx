import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from "react-bootstrap";
import {
  FaTooth, FaHeartbeat, FaBrain, FaBaby,
  FaUserMd, FaBone, FaUserNurse, FaEye, FaVenus
} from 'react-icons/fa';
import TitleWithHr from "../../../core/components/TitleWithHr/TitleWithHr";
import PatientHeader from "../Home/Components/Header/PatientHeader";
import PatientFooter from "../Home/Components/Footer/PatientFooter";
import DoctorRoleContainer from "../../Doctor/DoctorHome/Components/DoctorTaskContainer/DoctorRoleContainer";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getDoctorsCountBySpecialty } from '../../../core/services/patientServices';

function ViewDoctors() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const fetchCounts = async () => {
      try {
        const data = await getDoctorsCountBySpecialty();
        setCounts(data);
      } catch (err) {
        console.error('Error fetching doctor counts:', err);
      }
    };

    fetchCounts();
  }, []);

  const specializations = [
    { title: "Dentist", icon: <FaTooth style={{ color: "#D94D4D" }} />, path: '/patient/viewdoctors/dentist' },
    { title: "Cardiologist", icon: <FaHeartbeat style={{ color: "#F76E6E" }} />, path: '/patient/viewdoctors/cardiologist' },
    { title: "Neurologist", icon: <FaBrain style={{ color: "#9263CB" }} />, path: '/patient/viewdoctors/neurologist' },
    { title: "Pediatrician", icon: <FaBaby style={{ color: "#50C2C9" }} />, path: '/patient/viewdoctors/Pediatrician' },
    { title: "Dermatologist", icon: <FaUserMd style={{ color: "#FFBC80" }} />, path: '/patient/viewdoctors/Dermatologist' },
    { title: "Orthopedic", icon: <FaBone style={{ color: "#4C9A2A" }} />, path: '/patient/viewdoctors/Orthopedic' },
    { title: "Psychiatrist", icon: <FaUserNurse style={{ color: "#5A78FF" }} />, path: '/patient/viewdoctors/Psychiatrist' },
    { title: "Ophthalmologist", icon: <FaEye style={{ color: "#F177B6" }} />, path: '/patient/viewdoctors/Ophthalmologist' },
    { title: "Gynecologist", icon: <FaVenus style={{ color: "#D85C96" }} />, path: '/patient/viewdoctors/Gynecologist' },
  ];

  return (
    <>
      <PatientHeader />
      <div className="py-5 bg-light" style={{ minHeight: '100vh', backgroundColor: '#F7FAFC' }}>
        <Container>
          <Row>
            <Col md={12} data-aos="fade-down">
              <TitleWithHr title={'Available Specializations'} fontSize={'35px'} />
            </Col>
          </Row>
          <Row>
            {specializations.map((spec, index) => (
              <Col md={3} key={index} className="mb-4" data-aos="zoom-in" data-aos-delay={index * 30}>
                <DoctorRoleContainer
                  taskTitle={spec.title}
                  icon={spec.icon}
                  total={counts[spec.title] || 0}
                  path={spec.path}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <PatientFooter />
    </>
  );
}

export default ViewDoctors;
