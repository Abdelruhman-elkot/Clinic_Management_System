import PatientHeader from "../Home/Components/Header/PatientHeader";
import PatientFooter from "../Home/Components/Footer/PatientFooter";
import Colors from "../../../core/Constants/Colors";
import { useEffect, useContext, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { UserContext } from "../../../core/contexts/UserContext";
import { getAppointemnts, getMedicalRecords } from "../../../core/services/patientServices";
import MedicalRecords from "./components/MedicalRecords";
import AppointmentSchedule from "./components/AppointmentSchedule";
import PatientCard from "./components/PatientCard";
import FindDoctor from "./components/FindDoctor";


function MedicalHistory() {
  const [appointments, setAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState();
  const { user } = useContext(UserContext);

  const PatientName = user?.name;
  const PatientId = user?.id;

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const fetchAppointments = async () => {
      const data = await getAppointemnts(parseInt(PatientId));
      setAppointments(data);
    };

    const fetchMedicalRecords = async () => {
      const data = await getMedicalRecords(parseInt(PatientId));
      setMedicalRecords(data.medicalRecords);
    };

    fetchAppointments();
    fetchMedicalRecords();
  }, [PatientId]);

  return (
    <>
      <PatientHeader />
      <div className="container py-4" style={{ color: Colors.textPrimary }}>
        <div className="row">
          <div className="col-lg-4 mb-4" data-aos="fade-right">
          <div className="mb-4">
            <PatientCard name={PatientName} id={PatientId} />
          </div>
          <FindDoctor />
          </div>
          <div className="col-lg-8">
            <AppointmentSchedule appointments={appointments} />
          </div>
          <div className="col-12 mt-1">
          <MedicalRecords medicalRecords={medicalRecords} />
          </div>
        </div>
      </div>
      <PatientFooter />
    </>
  );
}

export default MedicalHistory;
