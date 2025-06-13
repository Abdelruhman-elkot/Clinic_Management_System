import React, { useState, useRef, useEffect, useContext } from 'react';
import { Row, Col, Container, Button, Form, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Colors from '../../../../core/Constants/Colors';
import PatientHeader from '../../Home/Components/Header/PatientHeader';
import PatientFooter from '../../Home/Components/Footer/PatientFooter';
import UserCard from './UserCard';
import { getDoctorsBySpeciality, bookAppointment, getDoctorAvailabiltyForRescheduling, getAppointemnts } from '../../../../core/services/patientServices';
import { UserContext } from '../../../../core/contexts/UserContext';
import Swal from 'sweetalert2';


function SpecialistsDoctors() {
    const user = useContext(UserContext);
    const { specialty } = useParams();
    const formRef = useRef(null);
    const [selectedDoctorIndex, setSelectedDoctorIndex] = useState(null);
    const [formData, setFormData] = useState({ date: '', time: '' });
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [patientAppointments, setPatientAppointments] = useState([]);
    const [canBook, setCanBook] = useState(true);
    const [availabilityData, setAvailabilityData] = useState({
        availableDays: [],
        availableTimeSlots: {},
    });
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [timeSlots, setTimeSlots] = useState([]);

    useEffect(() => {
        AOS.init({ duration: 1000, once: false });
    }, []);

    const dayMap = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Saturday',
    };

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const data = await getDoctorsBySpeciality(specialty);

                const formattedDoctors = data
                    .filter(doc => doc.availabilities.length > 0)
                    .map(doc => {
                        const availability = doc.availabilities[0];
                        const day1 = dayMap[availability?.day1] || '';
                        const day2 = dayMap[availability?.day2] || '';
                        return {
                            name: doc.username,
                            doctorId: doc.doctorId,
                            subtitle: `${day1} & ${day2}`,
                            timeAvb: `${availability?.startTime} - ${availability?.endTime}`,
                        };
                    });
                setDoctors(formattedDoctors);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, [specialty]);

    useEffect(() => {
        const fetchAppointments = async () => {
            if (user?.user?.id) {
                try {
                    const appointments = await getAppointemnts(user.user.id);
                    setPatientAppointments(appointments);
                } catch (err) {
                    console.error("Failed to fetch patient appointments", err);
                }
            }
        };
        fetchAppointments();
    }, [user]);


    const handleCardClick = async (index) => {
        setSelectedDoctorIndex(index === selectedDoctorIndex ? null : index);
        setFormData({ patientName: '', date: '', time: '' });

        const doctor = doctors[index];

        // Check if patient already has an appointment with this doctor
        const hasBooked = patientAppointments.some(
            (appt) =>
                appt.doctorId === doctor.doctorId && appt.status !== "Canceled"
        );

        if (hasBooked) {
            Swal.fire({
                title: 'Oops!',
                text: 'You have already booked with this doctor before. Cancel the old one and try again',
                icon: 'warning',
                confirmButtonText: 'Continue booking',
            });
            setCanBook(false);
            return; // skip showing form or fetching availability
        } else {
            setCanBook(true);
        }

        try {
            const availability = await getDoctorAvailabiltyForRescheduling(doctor.doctorId);

            setAvailabilityData({
                availableDays: availability.availableDays,
                availableTimeSlots: availability.availableTimeSlots,
            });
        } catch (err) {
            console.error("Error fetching availability:", err);
        }

        AOS.refresh();
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectedDoctor = doctors[selectedDoctorIndex];

        const dayIndexMap = {
            "Sunday": 0,
            "Monday": 1,
            "Tuesday": 2,
            "Wednesday": 3,
            "Thursday": 4,
            "Saturday": 5,
        };

        const appointmentDay = dayIndexMap[selectedDay];
        const timeSlots = availabilityData.availableTimeSlots[selectedDay];

        const timeIndex = timeSlots ? timeSlots.indexOf(selectedTime) : -1;

        if (
            user?.user.id === undefined ||
            selectedDoctor?.doctorId === undefined ||
            appointmentDay === undefined ||
            timeIndex === -1
        ) {
            alert("Invalid appointment data.");
            return;
        }

        try {
            //  Fetch existing appointments for this patient
            const existingAppointments = await getAppointemnts(user.user.id);

            //  Check for conflicting appointment
            const hasConflict = existingAppointments.some(appt =>
                appt.appointmentDay === selectedDay &&
                appt.appointmentTime === selectedTime &&
                appt.doctorId !== selectedDoctor.doctorId &&
                (appt.status === "Approved" || appt.status === "Pending")
            );

            if (hasConflict) {
                Swal.fire({
                    icon: "warning",
                    title: "Appointment Conflict",
                    text: `You already have an Approved or Pending appointment with another doctor at this time.`,
                    confirmButtonText: "Okay",
                });
                return;
            }

            // No conflict, continue booking
            const appointmentData = {
                patientId: user.user.id,
                doctorId: selectedDoctor.doctorId,
                appointmentDay,
                time: timeIndex
            };

            const result = await bookAppointment(appointmentData);

            Swal.fire({
                title: "Booked Successfully",
                icon: "success",
                confirmButtonText: "Okay",
            }).then(() => window.location.reload());

            // Clear form
            setFormData({ patientName: "", date: "", time: "" });
            setSelectedDoctorIndex(null);
            setSelectedDay("");
            setSelectedTime("");

        } catch (error) {
            console.error("Booking error:", error);
            alert("Failed to book appointment. Please try again.");
        }
    };




    return (
        <>
            <PatientHeader />
            <div className="py-5" style={{ minHeight: '100vh', backgroundColor: Colors.secondaryLight }}>
                <Container>
                    <Row>
                        <Col md={6}>
                            <h2 className="fw-bold" style={{ color: Colors.primary }} data-aos="fade-down">
                                {specialty.toUpperCase()} Doctors
                            </h2>
                        </Col>
                    </Row>

                    {loading ? (
                        <div className="text-center py-5">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    ) : doctors.length === 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
                            <h3 style={{ color: '#666', fontSize: '1.5rem', fontWeight: 'bold' }}>
                                "Oops! Looks like the doctors are on vacation... 🏖️<br />
                                Try again later or check back after their coffee break! ☕"
                            </h3>
                        </div>

                    ) : (
                        <Row style={{ paddingTop: '25px' }}>
                            {doctors.map((doctor, index) => (
                                <Col md={3} key={index} className="mb-4" data-aos="slide-up" data-aos-delay={index * 100}>
                                    <UserCard
                                        name={doctor.name}
                                        subtitle={doctor.subtitle || "Specialist"}
                                        timeAvb={doctor.timeAvb || "N/A"}
                                        onClick={() => handleCardClick(index)}
                                        isSelected={selectedDoctorIndex === index}
                                    />
                                </Col>
                            ))}
                        </Row>
                    )}

                    {selectedDoctorIndex !== null && canBook && (
                        <Row className="mt-5" ref={formRef} data-aos="zoom-in">
                            <Col md={12}>
                                <div className="p-4 shadow rounded" style={{ backgroundColor: Colors.white }}>
                                    <h4 className="mb-3 text-center" style={{ color: Colors.textPrimary }}>
                                        Book with {doctors[selectedDoctorIndex].name}
                                    </h4>
                                    <Form onSubmit={handleSubmit}>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Select Day</Form.Label>
                                            <Form.Select
                                                value={selectedDay}
                                                onChange={(e) => {
                                                    setSelectedDay(e.target.value);
                                                    setSelectedTime("");
                                                    const slots = availabilityData.availableTimeSlots[e.target.value] || [];
                                                    setTimeSlots(slots);
                                                }}
                                                required
                                            >
                                                <option value="">-- Choose a Day --</option>
                                                {availabilityData.availableDays?.map((day) => (
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
                                                    <option value="">-- Choose a Time Slot --</option>
                                                    {timeSlots.map((time, idx) => (
                                                        <option key={idx} value={time}>
                                                            {time}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                        )}

                                        <div className="text-center">
                                            <Button
                                                type="submit"
                                                style={{ background: Colors.warning, border: "none" }}
                                                disabled={!selectedDay || !selectedTime}
                                            >
                                                Confirm Appointment
                                            </Button>
                                        </div>
                                    </Form>

                                </div>
                            </Col>
                        </Row>
                    )}
                </Container>
            </div>
            <PatientFooter />
        </>
    );
}

export default SpecialistsDoctors;
