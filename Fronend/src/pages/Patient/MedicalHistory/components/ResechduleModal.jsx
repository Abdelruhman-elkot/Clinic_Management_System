import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Colors from "../../../../core/Constants/Colors";

function RescheduleModal({ show, handleClose, onSubmit, appointment }) {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);

  console.log('appointmnet test: ',appointment);


  useEffect(() => {
    if (appointment?.doctorAvailability && selectedDay) {
      const slots = appointment.doctorAvailability.availableTimeSlots[selectedDay] || [];
      setTimeSlots(slots);
      setSelectedTime(""); // reset time when changing day
    }
  }, [selectedDay, appointment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDay && selectedTime) {
      onSubmit({ day: selectedDay, time: selectedTime });
      handleClose();
    }
  };

  const getDayName = (index) => {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"][index];
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Reschedule Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Select Day</Form.Label>
            <Form.Select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              required
            >
              <option value="">-- Choose a day --</option>
              {appointment?.doctorAvailability?.availableDays.map((day) => (
  <option key={day} value={day}>
    {day}
  </option>
))}
            </Form.Select>
          </Form.Group>

          {selectedDay && (
            <Form.Group className="mb-3">
              <Form.Label>Select Time</Form.Label>
              <Form.Select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
              >
                <option value="">-- Choose a time --</option>
                {timeSlots.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}

          <Button
            type="submit"
            style={{ color: Colors.white, backgroundColor: Colors.warning }}
            disabled={!selectedDay || !selectedTime}
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RescheduleModal;

