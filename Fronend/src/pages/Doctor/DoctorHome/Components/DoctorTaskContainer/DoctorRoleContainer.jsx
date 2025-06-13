import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import styles from './DoctorRoleContainer.module.css';
import { useNavigate } from 'react-router-dom';

function DoctorRoleContainer(props) {
  const navigate = useNavigate();
  return (
    <Card className={styles.container} style={{ fontFamily: 'Sansation, sans-serif' }} onClick={() => navigate(props.path)}>
      <Card.Body>
        <Card.Title className={styles.title}>{props.taskTitle}</Card.Title>
        <Row className={styles.content}>
          <Col xs="auto" className={styles.icon}>
            {props.icon}
          </Col>
          <Col className={styles.totalSection}>
            <h4 className={styles.totalLabel}>Total</h4>
            <div className={styles.spacer}></div>
            <p className={styles.totalNumber}>{props.total}</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default DoctorRoleContainer;
