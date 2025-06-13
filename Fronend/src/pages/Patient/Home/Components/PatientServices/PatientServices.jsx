import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import {
  FaFolderOpen,
  FaCalendarCheck,
  FaComments,
  FaPrescriptionBottle,
} from "react-icons/fa";
import "./PatientServices.css";
import { useNavigate } from "react-router-dom";
import Colors from "../../../../../core/Constants/Colors";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
function PatientServices() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const services = [
    {
      icon: <FaCalendarCheck size={30} />,
      title: "Specialist Appointments",
      description:
        "Find and book appointments with top specialist doctors in just a few clicks — available 24/7.",
    },
    {
      icon: <FaComments size={30} />,
      title: "Instant Chat with Your Doctor",
      description:
        "Secure and real-time messaging with your doctor for follow-ups, reports, and questions.",
    },
    {
      icon: <FaPrescriptionBottle size={30} />,
      title: "E-Prescriptions",
      description: "Receive digital prescriptions directly after consultation.",
    },
    {
      icon: <FaFolderOpen size={30} />,
      title: "Medical Records Access",
      description:
        "View and download your prescriptions, diagnoses, and reports anytime — all in one secure place",
    },
  ];

  return (
    <section
      className="py-5"
      style={{
        background: `linear-gradient(to right, ${Colors.primaryGradient.join(
          ", "
        )})`,
      }}
    >
      <Container className="mt-5 mb-5 text-white">
        <Row>
          <Col lg={5} data-aos="fade-right">
            <h2 className="fw-bold" style={{ color: Colors.white }}>
              Explore Our Specialized Medical Services
            </h2>
            <p style={{ color: Colors.secondaryLight }}>
              Our platform connects you with top-tier healthcare professionals
              across multiple specialties.
              <br />
              Book appointments, chat with doctors, and receive the care you
              deserve—all in one place.
            </p>
            <Button
              style={{
                backgroundColor: Colors.error,
                color: Colors.white,
                border: "none",
              }}
              onClick={() => navigate("/patient/viewdoctors")}
            >
              Discover Specialists Now
            </Button>
          </Col>

          <Col lg={7}>
            <Row>
              {services.map((service, id) => (
                <Col md={6} className="mb-4" key={id} data-aos="zoom-in"
        data-aos-delay={id * 100}>
                  <Card
                    className="h-100 shadow-sm border-0 card-hover-blue"
                    style={{
                      backgroundColor: Colors.secondaryLight,
                    }}
                  >
                    <Card.Body>
                      <div className="d-flex align-items-center mb-3">
                        <div
                          className="me-3"
                          style={{
                            color: Colors.error,
                            fontSize: "1.5rem",
                          }}
                        >
                          {service.icon}
                        </div>
                        <h5
                          className="mb-0 fw-bold"
                          style={{ color: Colors.textPrimary }}
                        >
                          {service.title}
                        </h5>
                      </div>
                      <Card.Text style={{ color: Colors.textMuted }}>
                        {service.description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default PatientServices;
