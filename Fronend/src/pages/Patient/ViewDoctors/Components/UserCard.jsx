import "./UserCard.css";
import React from "react";
import { Card, Row, Col, Image } from "react-bootstrap";
import profileImg from "../../../../assets/images/profile.jpg";
import Colors from "../../../../core/Constants/Colors";

function UserCard({
    name,
    subtitle,
    image = profileImg,
    timeAvb,
    onClick,
    isSelected = false,
    }) {
    return (
        <Card
        className={`custom-card shadow-sm rounded-4 p-3 ${
            isSelected ? "selected" : ""
        }`}
        onClick={onClick}
        style={{
            backgroundColor: Colors.white,
            border: isSelected ? `2px solid ${Colors.primary}` : "1px solid #eee",
            cursor: "pointer",
        }}
        >
        <Row className="align-items-center mb-2">
            <Col xs={4}>
            <Image
                src={image}
                roundedCircle
                width={60}
                height={60}
                className="me-2"
                alt="User profile"
            />
            </Col>
            <Col>
            <div
                className="time-badge px-2 py-1 w-100 text-center"
                style={{
                backgroundColor: Colors.secondary,
                color: Colors.textPrimary,
                fontSize: '12px'
                }}
            >
                <strong>{timeAvb}</strong>
            </div>
            </Col>
        </Row>
        <Row>
            <Col className="text-start">
            <h6 className="fw-bold mb-0">{name}</h6>
            <p className="text-muted mb-0">{subtitle}</p>
            </Col>
        </Row>
        </Card>
    );
}

export default UserCard;
