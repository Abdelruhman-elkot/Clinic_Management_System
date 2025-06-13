import { Modal, Button } from "react-bootstrap";

function CancelModal({ show, handleClose, onConfirm }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cancel Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to cancel this appointment?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Yes, Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CancelModal;
