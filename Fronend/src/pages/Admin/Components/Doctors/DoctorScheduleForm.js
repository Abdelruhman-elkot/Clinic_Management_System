import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function DoctorScheduleForm({ show, doctor, onClose, onSave }) {
  const [firstDay, setFirstDay] = useState("");
  const [secondDay, setSecondDay] = useState("");

  const dayMap = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Saturday",
  ];

  const nameToIndex = (name) => dayMap.indexOf(name);
  const indexToName = (index) => dayMap[index];

  useEffect(() => {
    if (doctor?.availableDays && doctor.availableDays.length >= 2) {
      setFirstDay(indexToName(doctor.availableDays[0]));
      setSecondDay(indexToName(doctor.availableDays[1]));
    } else {
      setFirstDay("");
      setSecondDay("");
    }
  }, [doctor]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSchedule = [nameToIndex(firstDay), nameToIndex(secondDay)].filter(
      (index) => index !== -1
    );
    onSave(doctor._id, newSchedule);
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
          Manage Schedule for {doctor?.name}
        </h4>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "bold" }}>First Day</Form.Label>
            <Form.Select
              value={firstDay}
              onChange={(e) => setFirstDay(e.target.value)}
              required
              style={{
                border: "none",
                borderBottom: "1px solid #ccc",
                borderRadius: 0,
                boxShadow: "none",
              }}
            >
              <option value="" disabled>
                Select the first day
              </option>
              {dayMap.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "bold" }}>Second Day</Form.Label>
            <Form.Select
              value={secondDay}
              onChange={(e) => setSecondDay(e.target.value)}
              required
              style={{
                border: "none",
                borderBottom: "1px solid #ccc",
                borderRadius: 0,
                boxShadow: "none",
              }}
            >
              <option value="" disabled>
                Select the second day
              </option>
              {dayMap.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="outline-secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}

export { DoctorScheduleForm };
