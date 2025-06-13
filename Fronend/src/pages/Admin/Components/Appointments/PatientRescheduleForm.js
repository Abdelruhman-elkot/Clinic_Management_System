import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"];

function PatientRescheduleForm({ show, patient, onClose, availabilityData = [], onSave }) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");  

  useEffect(() => {
    if (show) {
      setSelectedDayIndex(null);
      setAvailableTimeSlots([]);
      setSelectedSlot("");
    }
  }, [show]);

  const handleDayChange = (e) => {
    const dayIndex = parseInt(e.target.value);
    setSelectedDayIndex(dayIndex);
    setSelectedSlot("");

    const foundDay = availabilityData.find((item) => item.day === dayIndex);
    setAvailableTimeSlots(foundDay ? foundDay.timeSlots : []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDayIndex !== null && selectedSlot !== "") {
      const slotIndex = availableTimeSlots.indexOf(selectedSlot); // ✅ This line uses the actual value
      if (slotIndex !== -1) {
        onSave(patient._id, {
          day: selectedDayIndex,
          time: slotIndex
        });
      }
      onClose();
    }
  };

  return (
     <Modal
      show={show}
      onHide={onClose}
      centered
      contentClassName="border-0"
      dialogClassName="modal-dialog-centered"
    >
      <div
        style={{
      borderRadius: "16px",
      padding: "40px",
      backgroundColor: "#f9f9f9",
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      maxWidth: "720px", 
      margin: "auto",
      width: "100%", 

        }}
      >
        <h4
          style={{
            textAlign: "center",
            color: "#007bff",
            fontWeight: "bold",
            marginBottom: "24px",
          }}
        >
          Reschedule Appointment for {patient?.name}
        </h4>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "bold" }}>Choose Day</Form.Label>
            <Form.Select value={selectedDayIndex ?? ""} onChange={handleDayChange} required
            style={{
                border: "none",
                borderBottom: "1px solid #ccc",
                borderRadius: 0,
                boxShadow: "none",
              }}>
              <option value="" disabled>Select a day</option>
              {(availabilityData || []).map((item) => (
                <option key={item.day} value={item.day}>
                  {dayNames[item.day]}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "bold" }}>Choose Time Slot</Form.Label>
            <Form.Select
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
              disabled={selectedDayIndex === null || availableTimeSlots.length === 0}
              required
              style={{
                border: "none",
                borderBottom: "1px solid #ccc",
                borderRadius: 0,
                boxShadow: "none",
              }}
            >
              <option value="" disabled>
                {availableTimeSlots.length > 0 ? "Select a time slot" : "No available slots"}
              </option>
              {availableTimeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={selectedDayIndex === null || selectedSlot === ""}
          >
            Reschedule
          </Button>
        </Modal.Footer>
      </Form>
      </div>
    </Modal>
  );
}

export { PatientRescheduleForm };
