import Colors from "../../../../core/Constants/Colors";
import CancelModal from "./CancelModal";
import RescheduleModal from "./ResechduleModal";
import { useState } from "react";
import { cancelAppointment, getAppointemnts, getDoctorAvailabiltyForRescheduling, rescheduleAppointment } from "../../../../core/services/patientServices.js";
import { CAlert } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilBurn, cilCheckCircle } from '@coreui/icons';
import Swal from 'sweetalert2';
function AppointmentSchedule({ appointments }) {
  console.log(appointments);
  const [alert, setAlert] = useState(null);

  const statusColors = {
    Pending: Colors.warning,
    Rescheduled: Colors.darkGray,
    Approved: Colors.success,
    Canceled: Colors.error,
  };
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);


  const handleOpenModal = async (appointment) => {
    try {
      const doctorAvailability = await getDoctorAvailabiltyForRescheduling(parseInt(appointment.doctorId));
      console.log(doctorAvailability)
      setSelectedAppointment({
        ...appointment,
        doctorAvailability,
      });
      setShowModal(true);
    } catch (error) {
      console.error("Failed to fetch doctor availability", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
  };



  const handleRescheduleSubmit = async (newTime) => {
    console.log("Rescheduled to:", newTime, "for", selectedAppointment);

    try {

      const dayIndexMap = {
        "Sunday": 0,
        "Monday": 1,
        "Tuesday": 2,
        "Wednesday": 3,
        "Thursday": 4,
        "Saturday": 5,
      };

      const dayIndex = dayIndexMap[newTime.day];
      const timeSlots = selectedAppointment?.doctorAvailability?.availableTimeSlots?.[newTime.day];
      console.log('time slots: ', timeSlots);

      if (!timeSlots) {
        throw new Error(`No time slots available for ${newTime.day}`);
      }

      const timeIndex = timeSlots.indexOf(newTime.time);
      console.log('time index, ', timeIndex)

      if (dayIndex === undefined || timeIndex === -1) {
        throw new Error("Invalid time or day selected.");
      }

      //  Conflict Check
      const patientAppointments = await getAppointemnts(selectedAppointment.patientId);

      const hasConflict = patientAppointments.some(appt =>
        appt.appointmentDay === newTime.day &&
        appt.appointmentTime === newTime.time &&
        appt.appointmentId !== selectedAppointment.appointmentId &&
        // appt.doctorId !== selectedAppointment.doctorId &&
        (appt.status === "Approved" || appt.status === "Pending")
      );

      if (hasConflict) {
        Swal.fire({
          icon: "warning",
          title: "Time Conflict",
          text: "This patient already has an Approved or Pending appointment with another doctor at this time.",
          confirmButtonText: "Okay",
        });
        return;
      }

      //  Proceed with rescheduling
      await rescheduleAppointment(
        parseInt(selectedAppointment.appointmentId),
        dayIndex,
        timeIndex
      );

      console.log("Rescheduling successful");
      setShowModal(false);
      setAlert(
        <CAlert color="success" className="d-flex align-items-center mt-3">
          <CIcon icon={cilCheckCircle} className="flex-shrink-0 me-2" width={24} height={24} />
          <div>Appointment rescheduled successfully!</div>
        </CAlert>
      );

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      console.error("Rescheduling failed:", error);
      setAlert(
        <CAlert color="danger" className="d-flex align-items-center mt-3">
          <CIcon icon={cilBurn} className="flex-shrink-0 me-2" width={24} height={24} />
          <div>Failed to reschedule appointment. Please try again.</div>
        </CAlert>
      );
    }
  };


  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleCancel = async () => {
    try {

      await cancelAppointment(parseInt(selectedAppointment.appointmentId));
      console.log("Appointment cancelled");
      setShowCancelModal(false);
      setAlert(
        <CAlert color="danger" className="d-flex align-items-center mt-3">
          <CIcon icon={cilBurn} className="flex-shrink-0 me-2" width={24} height={24} />
          <div>Appointment canceled successfully!</div>
        </CAlert>
      );
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log('Error while fetching cancel api: ', error);
      <CAlert color="danger" className="d-flex align-items-center mt-3">
        <CIcon icon={cilBurn} className="flex-shrink-0 me-2" width={24} height={24} />
        <div>Failed to cancel the appointment. Please try again.</div>
      </CAlert>
    }

  };


  return (
    <div className="card shadow p-4 border-0" style={{ height: "fit-content" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0" style={{ color: "#05445E" }}>
          Your appointment schedule
        </h5>
      </div>
      <hr />
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "1rem",
        }}
      >
        {(!appointments || appointments.length === 0) ? (
          <div className="text-center mt-5">
            <h4>No Appointments rightnow</h4>
            <p>Your appointmnets will appear here after you book them.</p>
          </div>
        ) : appointments.map((item, index) => (
          <div
            key={index}
            className="text-center"
            style={{
              minWidth: "250px",
              flexShrink: 0,
            }}
          >
            <div
              className="rounded-3 py-2 mb-2"
              style={{
                backgroundColor: statusColors[item.status] || Colors.primary,
                color: Colors.white,
              }}
            >
              <div className="fw-bold fs-4">{item.appointmentDay}</div>
              <div className="text-uppercase" style={{ fontSize: "14px" }}>
                {item.status}
              </div>
            </div>
            <div className="fw-semibold" style={{ color: Colors.textPrimary }}>
              {item.doctorName}
            </div>
            <div style={{ color: Colors.warning, fontSize: "1.25rem" }}>
              {item.appointmentTime}
            </div>
            <div className="d-flex justify-content-center gap-2 mt-2">

              {item.status === "Approved" && (
                <div style={{ color: Colors.success, fontSize: "0.9rem", textAlign: "center" }}>
                  This appointment has been approved<br />and cannot be rescheduled.
                </div>
              )}

              {item.status === "Canceled" && (
                <div style={{ color: Colors.error, fontSize: "0.9rem", textAlign: "center" }}>
                  This appointment was canceled<br />and can no longer be modified.
                </div>
              )}


              {item.status !== "Canceled" && item.status !== "Approved" && (
                <button
                  className="btn btn-sm rounded-pill"
                  style={{
                    backgroundColor: Colors.error,
                    color: Colors.white,
                  }}
                  onClick={() => {
                    setSelectedAppointment(item);
                    setShowCancelModal(true);
                  }}
                >
                  Cancel
                </button>
              )}

              {/* Show Reschedule button only if not Canceled or Approved */}
              {item.status !== "Canceled" && item.status !== "Approved" && (
                <button
                  className="btn btn-sm rounded-pill"
                  style={{
                    border: `1px solid ${Colors.warning}`,
                    color: Colors.warning,
                  }}
                  onClick={() => handleOpenModal(item)}
                >
                  Reschedule
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <RescheduleModal
        show={showModal}
        handleClose={handleCloseModal}
        onSubmit={handleRescheduleSubmit}
        appointment={selectedAppointment}
      />
      <CancelModal
        show={showCancelModal}
        handleClose={() => setShowCancelModal(false)}
        onConfirm={handleCancel}
      />
      {alert}
    </div>
  );
}

export default AppointmentSchedule;
