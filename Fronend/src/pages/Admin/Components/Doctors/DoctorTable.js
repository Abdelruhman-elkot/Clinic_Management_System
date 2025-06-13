import { useState, useEffect } from "react";
import { AiOutlineCalendar, AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { FaUserMd } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { DoctorForm } from "./DoctorForm";
import { DoctorScheduleForm } from "./DoctorScheduleForm";
import { PhoneNumberEditForm } from "./PhoneNumberEditForm";
import { toast, ToastContainer } from 'react-toastify';
import { ConfirmModal } from '../../Components/Confirm Message/ConfirmModal';
import axios from "axios";
import './DoctorTable.css'; // ⭐ تأكد من وجود ملف CSS منفصل أو استخدم <style>

const headerVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const dayMap = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Saturday",
};

function DoctorTable() {
  const [doctors, setDoctors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);

  useEffect(() => {
    axios.get("https://localhost:7151/api/Admin/doctors")
      .then((response) => {
        const mappedDoctors = response.data.map(doc => ({
          _id: doc.doctorId,
          name: doc.fullName,
          email: doc.email,
          phoneNumber: doc.phoneNumber,
          specialty: doc.specialization,
          availableDays: Array.isArray(doc.availableDays) ? doc.availableDays : [],
          availability: doc.availability || '',
        }));
        setDoctors(mappedDoctors);
      })
      .catch((error) => {
        console.error("Failed to fetch doctors:", error);
      });
  }, []);

  const handleAddDoctor = (doctorData) => {
    const newDoctor = {
      FirstName: doctorData.firstName,
      LastName: doctorData.lastName,
      Email: doctorData.email,
      Password: doctorData.password,
      PhoneNumber: doctorData.phone,
      Specialization: parseInt(doctorData.specialty)
    };

    axios.post('https://localhost:7151/api/Admin/doctors', newDoctor)
      .then((res) => {
        setDoctors([...doctors, {
          _id: res.data.doctorId,
          name: res.data.fullName,
          email: res.data.email,
          phoneNumber: res.data.phoneNumber,
          specialty: res.data.specialization,
          availableDays: res.data.availableDays || [],
          availability: res.data.availability || "Not Assigned"
        }]);
        setShowForm(false);
        toast.success('Doctor added successfully');
      })
      .catch((err) => {
        console.error("Failed to add doctor:", err);
        toast.error('Failed to add doctor');
      });
  };

  const handleDeleteClick = (doctor) => {
    setDoctorToDelete(doctor);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    axios.delete(`https://localhost:7151/api/Admin/doctors/${doctorToDelete._id}`)
      .then(() => {
        setDoctors(doctors.filter(doc => doc._id !== doctorToDelete._id));
        toast.success('Doctor deleted successfully');
      })
      .catch(error => {
        console.error('Failed to delete doctor:', error);
        toast.error('Failed to delete doctor');
      })
      .finally(() => {
        setShowConfirm(false);
        setDoctorToDelete(null);
      });
  };

  const handleOpenScheduleForm = (doctor) => {
    setSelectedDoctor(doctor);
    setShowScheduleForm(true);
  };

  const handleOpenPhoneForm = (doctor) => {
    setSelectedDoctor(doctor);
    setShowPhoneForm(true);
  };

  const handleSavePhoneNumber = (doctorId, newPhoneNumber) => {
    axios.put(`https://localhost:7151/api/Admin/doctors/${doctorId}`, { phoneNumber: newPhoneNumber })
      .then(() => {
        const updatedDoctors = doctors.map(doc =>
          doc._id === doctorId ? { ...doc, phoneNumber: newPhoneNumber } : doc
        );
        setDoctors(updatedDoctors);
        toast.success('Phone number updated successfully');
      })
      .catch((err) => {
        console.error("Failed to update phone number:", err);
        toast.error('Failed to update phone number');
      });
  };

  const handleSaveSchedule = (doctorId, newSchedule) => {
    if (!Array.isArray(newSchedule)) {
      console.error("Invalid schedule format");
      return;
    }

    axios.post(`https://localhost:7151/api/Admin/doctors/${doctorId}/availability`, {
      availableDays: newSchedule
    })
      .then(() => axios.get(`https://localhost:7151/api/Admin/doctors/${doctorId}`))
      .then((res) => {
        const updatedDoctor = res.data;
        const updatedDoctors = doctors.map(doc =>
          doc._id === doctorId
            ? {
              ...doc,
              availableDays: updatedDoctor.availableDays || [],
              availability: updatedDoctor.availability || ''
            }
            : doc
        );
        setDoctors(updatedDoctors);
        setShowScheduleForm(false);
        toast.success("Schedule assigned successfully!");
      })
      .catch((error) => {
        console.error("Failed to save schedule or fetch updated doctor:", error);
        toast.error("Failed to assign schedule.");
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
    <FaUserMd />
  </div>

  <h2 className="m-0 fw-bold text-primary-emphasis">
    Manage <span className="text-primary">Doctors</span> </h2>
        <motion.button
          className="btn btn-primary rounded-5"
          onClick={() => setShowForm(true)}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          + Add New Doctor
        </motion.button>
      </motion.div>

      <AnimatePresence>
        <motion.div
          key="doctor-table"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4 }}>
           <div className="table-wrapper">
  <table className="doctor-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Doctor Name</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>Specialty</th>
        <th>Available Days</th>
        <th>Availability</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {doctors.map((doc) => (
        <tr key={doc._id}>
          <td>{doc._id}</td>
          <td>{doc.name}</td>
          <td>{doc.email}</td>
          <td>{doc.phoneNumber}</td>
          <td>{doc.specialty}</td>
          <td>
            {Array.isArray(doc.availableDays) && doc.availableDays.length > 0
              ? doc.availableDays.map(index => dayMap[index] || index).join(" - ")
              : "Not Assigned"}
          </td>
          <td>{doc.availability || 'Not Assigned'}</td>
          <td>
            <button className="table-action-btn schedule" onClick={() => handleOpenScheduleForm(doc)} title="Schedule">
              <AiOutlineCalendar />
            </button>
            <button className="table-action-btn delete" onClick={() => handleDeleteClick(doc)} title="Delete">
              <MdDeleteOutline />
            </button>
            <button className="table-action-btn edit" onClick={() => handleOpenPhoneForm(doc)} title="Edit">
              <AiOutlineEdit />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
        </motion.div>
      </AnimatePresence>

      <DoctorForm show={showForm} onClose={() => setShowForm(false)} onSubmit={handleAddDoctor} />

      {selectedDoctor && (
        <DoctorScheduleForm
          show={showScheduleForm}
          doctor={selectedDoctor}
          onClose={() => setShowScheduleForm(false)}
          onSave={handleSaveSchedule}
        />
      )}

      {selectedDoctor && (
        <PhoneNumberEditForm
          show={showPhoneForm}
          doctor={selectedDoctor}
          onClose={() => setShowPhoneForm(false)}
          onSave={handleSavePhoneNumber}
        />
      )}

      <ConfirmModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete Dr. ${doctorToDelete?.name}?`}
      />

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export { DoctorTable };
