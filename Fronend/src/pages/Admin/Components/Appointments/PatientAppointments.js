import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaCheck , FaCalendarCheck } from "react-icons/fa";
import { AiOutlineCalendar } from "react-icons/ai";
import { VscChromeClose } from "react-icons/vsc";
import { ToastContainer, toast } from "react-toastify";
import { PatientRescheduleForm } from "./PatientRescheduleForm";
import './PatientAppointments.css';
import axios from "axios";

const headerVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

function PatientAppointments() {
  const [patients, setPatients] = useState([]);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [availabilityData, setAvailabilityData] = useState(null);

  const slots = [
    "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
    "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM",
    "09:00 PM", "09:30 PM"
  ];

  const dayNameToIndex = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Saturday: 5 
  };

  const indexToDayName = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Saturday"
  };



  const timeSlotToIndex = slots.reduce((acc, time, index) => {
    acc[time] = index;
    return acc;
  }, {});

  const fetchAppointments = () => {
    axios.get("https://localhost:7151/api/Appointments")
      .then((res) => {
        const data = res.data.map((p) => ({
          _id: p.appointmentId,
          name: p.patientName,
          doctorName: p.doctorName,
          doctorId: p.doctorId,
          day: dayNameToIndex[p.appointmentDay],
          time: timeSlotToIndex[p.appointmentTime],
          status: p.status
        }));
        setPatients(data);
      })
      .catch(err => console.error("Error fetching appointments:", err));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleApprove = (id) => {
    axios.put(`https://localhost:7151/api/Appointments/${id}/approve`)
      .then(() => {
        setPatients(prev => prev.map(p => p._id === id ? { ...p, status: "Approved" } : p));
        toast.success("Appointment approved successfully!");
      })
      .catch(() => toast.error("Failed to approve appointment."));
  };

  const handleCancel = (id) => {
    axios.put(`https://localhost:7151/api/Appointments/${id}/cancel`)
      .then(() => {
        setPatients(prev => prev.map(p => p._id === id ? { ...p, status: "Canceled" } : p));
        toast.success("Appointment canceled successfully!");
      })
      .catch(() => toast.error("Failed to cancel appointment."));
  };

  const handleManage = (patient) => {
    setSelectedPatient(patient);
    setAvailabilityData([]);

    if (patient?.doctorId) {
      axios
        .get(`https://localhost:7151/api/Admin/doctors/${patient.doctorId}/availability`)
        .then((res) => {
          const data = res.data;
          const transformed = data.availableDays.map(dayName => ({
            day: dayNameToIndex[dayName],
            timeSlots: data.availableTimeSlots[dayName] || []
          }));
          setAvailabilityData(transformed);
        })
        .catch(() => {
          toast.error("Failed to load doctor's availability.");
          setAvailabilityData([]);
        });
    }

    setShowRescheduleModal(true);
  };

  const handleRescheduleSave = (id, { day, time }) => {
    const payload = {
      newAppointmentDay: day,
      newTime: time
    };

    axios.put(`https://localhost:7151/api/Appointments/${id}/reschedule`, payload)
      .then(() => {
        setPatients(prev =>
          prev.map(p =>
            p._id === id
              ? { ...p, day, time, status: "Pending" }
              : p
          )
        );
        setShowRescheduleModal(false);
        toast.success("Appointment rescheduled successfully!");
      })
      .catch((err) => {
        const message = err.response?.data || err.message;
        console.error("Reschedule error:", message);

        if (message === "The selected time slot is not available") {
          toast.error("This time slot is already taken. Please choose another.");
        } else {
          toast.error("Failed to reschedule appointment.");
        }
      });
  };

  return (
    <div className="container mt-5 doctor-table-container">
      <motion.div
       className="d-flex align-items-center gap-3 px-4 py-3 rounded-3 mb-4 shadow-sm"
  style={{
    background: "linear-gradient(90deg, #e3f2fd, #bbdefb)",
    borderLeft: "6px solid #2196f3"
  }}
  variants={headerVariants}
  initial="hidden"
  animate="visible"
      >
        <div
            className="icon-box d-flex justify-content-center align-items-center rounded-circle"
            style={{
              backgroundColor: "#2196f3",
              width: "48px",
              height: "48px",
              color: "#fff",
              fontSize: "1.5rem"
            }}
          >
           <FaCalendarCheck/>
          </div>
      <h2 className="m-0 fw-bold text-primary-emphasis">
    Patient <span className="text-primary">Appointments</span> </h2>
      </motion.div>

      <AnimatePresence>
        <motion.div
          key="doctor-table"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4 }}>
           <div className="table-wrapper" >
          <table className="doctor-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient Name</th>
                <th>Doctor Name</th>
                <th>Day</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <motion.tr
                  key={p._id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <td>{p._id}</td>
                  <td>{p.name}</td>
                  <td>{p.doctorName}</td>
                  <td>{indexToDayName[p.day] ?? "N/A"}</td>
                  <td>{slots[p.time] ?? "N/A"}</td>
                  <td>{p.status}</td>
                  <td>
                    <div className="d-flex justify-content-start gap-2">
                      <button
                        className="table-action-btn edit"
                        title="Manage"
                        onClick={() => handleManage(p)}
                      >
                        <AiOutlineCalendar />
                      </button>
                      <button
                        className="table-action-btn schedule"
                        title="Approve"
                        onClick={() => handleApprove(p._id)}
                      >
                        <FaCheck />
                      </button>
                      <button
                        className="table-action-btn delete"
                        title="Cancel"
                        onClick={() => handleCancel(p._id)}
                      >
                        <VscChromeClose />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          </div>
        </motion.div>
      </AnimatePresence>

      <PatientRescheduleForm
        show={showRescheduleModal}
        patient={selectedPatient}
        onClose={() => setShowRescheduleModal(false)}
        onSave={handleRescheduleSave}
        availabilityData={availabilityData || []}
      />

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export { PatientAppointments };
