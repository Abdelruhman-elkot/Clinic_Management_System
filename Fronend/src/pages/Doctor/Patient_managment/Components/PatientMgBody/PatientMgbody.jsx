import React, { useState, useEffect, useContext } from "react";
import styleSheet from "./PAtientMgbody.module.css";
import { Form, Button } from "react-bootstrap";
import avatar from "../../../../../assets/images/profile.jpg";
import Colors from "../../../../../core/Constants/Colors";
import { UserContext } from "../../../../../core/contexts/UserContext";
import { getPatientsByDoctor, sendPrescription } from "../../../../../core/services/doctorService";
import Swal from 'sweetalert2';

function PatientMgBody() {
  const { user } = useContext(UserContext);
  const [patients, setPatients] = useState([]);
  const [selectedPatientIndex, setSelectedPatientIndex] = useState(null);
  const [prescriptions, setPrescriptions] = useState("");

  useEffect(() => {
    async function fetchPatients() {
      if (user?.id) {
        const result = await getPatientsByDoctor(user.id);
        if (result) {
          setPatients(result);
        }
      }
    }
    fetchPatients();
  }, [user]);

  const handleButtonClick = (index) => {
    setSelectedPatientIndex(index === selectedPatientIndex ? null : index);
    setPrescriptions("");
  };

  const handleTextareaChange = (e) => {
    setPrescriptions(e.target.value);
  };

  const handleSubmit = async (e, patient) => {
    e.preventDefault();
    console.log("User Id ahooo =>"+user.id)
   console.log(typeof user.id)
    console.log("User Id ahooo =>"+patient.patientId)
    console.log(typeof patient.patientId)

    try {
      const response = await sendPrescription(parseInt(user.id), patient.patientId, prescriptions);
      if (response) {
        setSelectedPatientIndex(null);
        setPrescriptions("");
        Swal.fire({
                title: 'Successfully!',
                text: 'Paient got your prescription successfully.',
                icon: 'success',
                confirmButtonText: 'Done',
         });
      } else {
        Swal.fire({
                title: 'Oops!',
                text: 'Something went wrong.',
                icon: 'error',
                confirmButtonText: 'Try Again',
              });
      }
    } catch (error) {
      console.error("Error submitting prescription:", error);
      Swal.fire({
                title: 'Oops!',
                text: 'Something went wrong.',
                icon: 'error',
                confirmButtonText: 'Try Again',
              });
    }
  };

  return (
    <div className={`container ${styleSheet.TableContainer}`}>
      <div className="row g-4">
        {patients.length === 0 ? (
          <div className="text-center my-5">
            <h4 className="text-muted">🩺 No patients assigned yet</h4>
            <p className="text-secondary">
              You currently have no patients to manage. Check back later.
            </p>
          </div>
        ) : (
          patients.map((item, index) => (
            <div
              key={index}
              className="col-12"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={styleSheet.scheduleCard}>
                <div className="d-flex align-items-center gap-3 mb-2 mb-md-0">
                  <div className="d-flex align-items-center gap-3 mb-2 mb-md-0">
                    <img
                      src={avatar}
                      alt="patient"
                      width="60"
                      height="60"
                      style={{
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <h5 className="mb-1 fw-bold">{item.username}</h5>
                      <p className="mb-1 text-muted">
                        Patient ID: {item.patientId}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={styleSheet.rightSection}>
                  <div className={styleSheet.medicalComplaint}>
                    🩺 {item.medicalComplaint || "No complaint"}
                  </div>
                  <Button
                    onClick={() => handleButtonClick(index)}
                    style={{
                      backgroundColor: Colors.success,
                      border: "none",
                      padding: "6px 16px",
                      borderRadius: "20px",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Write Prescription
                  </Button>
                </div>
              </div>

              {selectedPatientIndex === index && (
                <div className="mt-3 px-3" data-aos="fade-left">
                  <Form onSubmit={(e) => handleSubmit(e, item)}>
                    <Form.Group className="mb-2">
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter prescription here..."
                        value={prescriptions}
                        onChange={handleTextareaChange}
                        style={{
                          borderRadius: "12px",
                          resize: "none",
                          maxWidth: "97%",
                        }}
                        required
                      />
                    </Form.Group>
                    <Button
                      type="submit"
                      style={{
                        backgroundColor: Colors.success,
                        border: "none",
                        padding: "6px 24px",
                        borderRadius: "20px",
                        fontWeight: "500",
                      }}
                    >
                      Submit
                    </Button>
                  </Form>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PatientMgBody;




