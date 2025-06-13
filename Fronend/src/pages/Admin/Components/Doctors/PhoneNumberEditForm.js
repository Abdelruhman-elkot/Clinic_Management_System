import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function PhoneNumberEditForm({ show, doctor, onClose, onSave }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setPhoneNumber(doctor?.phoneNumber || "");
    setError("");
  }, [doctor]);

  const handleInputChange = (e) => {
    setPhoneNumber(e.target.value);
    setError("");
  };

  const normalizePhoneNumber = (input) => {
    const cleaned = input.replace(/[^\d+]/g, "");
    if (cleaned.startsWith("+")) {
      return "+" + cleaned.slice(1).replace(/\D/g, "");
    }
    return cleaned.replace(/\D/g, "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleaned = normalizePhoneNumber(phoneNumber);

    if (!/^\+?\d{7,15}$/.test(cleaned)) {
      setError("Phone number must be 7–15 digits and may start with '+'.");
      return;
    }

    onSave(doctor._id, cleaned);
    onClose();
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
            marginBottom: "24px"
          }}
        >
          Edit Phone Number
        </h4>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "bold" }}>Phone Number</Form.Label>
            <Form.Control
              type="text"
              value={phoneNumber}
              onChange={handleInputChange}
              placeholder="e.g. +12345678901"
              isInvalid={!!error}
              required
            />
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
            <Form.Text muted>
              Format: digits only, may start with "+" for international numbers.
            </Form.Text>
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

export { PhoneNumberEditForm };
