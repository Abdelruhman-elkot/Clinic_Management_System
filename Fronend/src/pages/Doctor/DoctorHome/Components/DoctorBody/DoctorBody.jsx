import React, { useEffect, useState, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import doctorBodyStyle from './DoctorBody.module.css';
import DoctorRoleContainer from '../DoctorTaskContainer/DoctorRoleContainer';
import { FaStethoscope } from 'react-icons/fa';
import { BsReceiptCutoff, BsFillChatRightTextFill } from 'react-icons/bs';
import TitleWithHr from '../../../../../core/components/TitleWithHr/TitleWithHr';
import Colors from '../../../../../core/Constants/Colors';

// Get doctor context
import { UserContext } from "../../../../../core/contexts/UserContext";
import { getAppointmentsByDoctor } from "../../../../../core/services/doctorService";
import { getPatientsByDoctor } from "../../../../../core/services/doctorService"; // Add this import

function Doctor_Body() {
  const { user } = useContext(UserContext);
  
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]); // State for patients
  const [loading, setLoading] = useState(true);
  const doctorName = user?.name;
  const charCount = doctorName.length;

  useEffect(() => {
    if (user?.id) {
      async function fetchData() {
        // Fetch appointments
        const appointmentData = await getAppointmentsByDoctor(user.id);
        if (appointmentData) {
          setAppointments(appointmentData);
        } else {
          setAppointments([]); // If no data is returned
        }

        // Fetch patients
        const patientData = await getPatientsByDoctor(user.id);
        if (patientData) {
          setPatients(patientData);
        } else {
          setPatients([]); // If no data is returned
        }

        setLoading(false);
      }

      fetchData();
    }
  }, [user]);

  // Count all appointments (regardless of status)
  const scheduledAppointmentsCount = appointments.length;

  // Count all patients
  const patientCount = patients.length;

  return (
    <>
      <h3 className={doctorBodyStyle.welcomeMessage} data-aos="fade-down">
        Welcome, Doctor  
        <span> </span>
        <span
          className={doctorBodyStyle.doctorName}
          style={{
            '--char-count': charCount,
            '--name-width': `${charCount}ch`,
            color : Colors.error
          }}
        >
          {doctorName}
        </span>
      </h3>

      <div data-aos="fade-up">
        <TitleWithHr fontSize='28px' title="Choose an Option" />
      </div>

      <div className={doctorBodyStyle.tasksContainer}>
        <Row className="w-100">
          <Col xs={12} md={4} data-aos="fade-right" data-aos-delay="100">
            <DoctorRoleContainer
              taskTitle="Scheduled appointment"
              icon={<FaStethoscope color={Colors.error} />}
              total={loading ? "Loading..." : scheduledAppointmentsCount}
              path={'/doctor_home/doctorSchedule'}
            />
          </Col>
          <Col xs={12} md={4} data-aos="fade-up" data-aos-delay="200">
            <DoctorRoleContainer
              taskTitle="Patient management"
              icon={<BsReceiptCutoff color={Colors.success} />}
              total={loading ? "Loading..." : patientCount} 
              path={'/doctor_home/patient_managment'}
            />
          </Col>
          <Col xs={12} md={4} data-aos="fade-left" data-aos-delay="300">
            <DoctorRoleContainer
              taskTitle="Chat"
              icon={<BsFillChatRightTextFill color={Colors.secondaryDark} />}
              path={'/chats'}
              total={loading ? "Loading..." : patientCount} 
            />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Doctor_Body;
