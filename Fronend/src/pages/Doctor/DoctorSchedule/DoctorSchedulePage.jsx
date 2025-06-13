import React, { useEffect, useState, useContext } from "react";
import TitleWithHr from "../../../core/components/TitleWithHr/TitleWithHr";
import PatientFooter from "../../Patient/Home/Components/Footer/PatientFooter";
import DoctorHeader from "../DoctorHome/Components/DoctorHeader/Doctor_Header";
import styleSheet from "./DoctorSchedule.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Colors from "../../../core/Constants/Colors";
import { UserContext } from "../../../core/contexts/UserContext";
import { getAppointmentsByDoctor } from "../../../core/services/doctorService";
import photo from '../../../assets/images/koala.jpeg'

function DoctorSchedulePage() {
  const { user } = useContext(UserContext);
  const [groupedAppointments, setGroupedAppointments] = useState({});
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    if (user?.id) {
      async function fetchAppointments() {
        const data = await getAppointmentsByDoctor(user.id);

        if (data?.length === 0) {
          setIsEmpty(true);
        } else {
          const grouped = {};

          data.forEach((appt) => {
            const key = `${appt.appointmentDay}-${appt.appointmentTime}`;
            if (!grouped[key]) {
              grouped[key] = {
                time: appt.appointmentTime,
                day: appt.appointmentDay,
                patients: [],
              };
            }
            grouped[key].patients.push(appt.patientName);
          });

          setGroupedAppointments(grouped);
        }
      }

      fetchAppointments();
    }
  }, [user]);

  return (
    <div className={styleSheet.pageWrapper}>
      <DoctorHeader />
      <TitleWithHr title="Your Schedule" fontSize="28px" data-aos="fade-down" />

      {isEmpty ? (
        <div style={{ textAlign: "center",   display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'}}>
          <img
            src={photo} 
            alt="No appointments"
            style={{ width: "300px", alignSelf: 'center' }}
          />
          <h4 style={{ color: "#666" }}>
            “You don't have any appointments scheduled yet. Take a rest 😉!”
          </h4>
        </div>
      ) : (
        <div className={`container ${styleSheet.TableContainer}`}>
          <div className="row g-3">
            {Object.values(groupedAppointments).map((item, index) => (
              <div key={index} className="col-12" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className={styleSheet.scheduleCard}>
                  <div>
                    <h5 className="mb-1">{item.time}</h5>
                    <p className="mb-0 text-muted">{item.day}</p>
                  </div>
                  <div>
                    {item.patients.length > 0 ? (
                      item.patients.map((name, i) => (
                        <span key={i} className={styleSheet.badge} style={{ backgroundColor: Colors.primary, marginRight: "5px" }}>
                          {name}
                        </span>
                      ))
                    ) : (
                      <span className={styleSheet.badge} style={{ backgroundColor: Colors.warning }}>
                        No patients
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <PatientFooter />
    </div>
  );
}

export default DoctorSchedulePage;
