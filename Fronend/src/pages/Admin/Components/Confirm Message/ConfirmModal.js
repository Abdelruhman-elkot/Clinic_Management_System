import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaExclamationCircle } from 'react-icons/fa';

function ConfirmModal({ show, onHide, onConfirm, title, message }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="d-flex align-items-center gap-2">
          <FaExclamationCircle style={{ color: '#1565c0', fontSize: '20px' }} />
          <span style={{ color: '#0d47a1' }}>
            {title || 'Confirm Action'}
          </span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center">
        <p style={{ fontSize: '16px', color: '#333' }}>
          {message || 'Are you sure you want to delete this item?'}
        </p>
      </Modal.Body>

      <Modal.Footer className="justify-content-center border-0">
        <Button
          variant="outline-secondary"
          onClick={onHide}
          style={{
            borderRadius: '25px',
            padding: '6px 20px',
          }}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={onConfirm}
          style={{
            backgroundColor: '#1565c0',
            border: 'none',
            borderRadius: '25px',
            padding: '6px 20px',
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export { ConfirmModal };
