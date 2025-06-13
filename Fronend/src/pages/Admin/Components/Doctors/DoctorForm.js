import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function DoctorForm({ show, onClose, onSubmit, initialData }) {
  const [doctorData, setDoctorData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    specialty: ""
  });

  const [error, setError] = useState({});

  useEffect(() => {
    setDoctorData(
      initialData || {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        specialty: ""
      }
    );
  }, [initialData]);

  const validate = (field, value) => {
    const nameRegex = /^[A-Z][a-zA-Z\s]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;

    let message = "";

    if (!value || value === "") {
      message = "This field is required.";
    } else {
      switch (field) {
        case "firstName":
        case "lastName":
          if (!nameRegex.test(value)) {
            message = "Must start with capital letter and be 3+ characters.";
          }
          break;
        case "email":
          if (!emailRegex.test(value)) {
            message = "Invalid email format.";
          }
          break;
        case "phone":
          if (!phoneRegex.test(value)) {
            message = "Phone must be 10–15 digits.";
          }
          break;
        case "password":
          if (!passwordRegex.test(value)) {
            message = "Min 8 chars, uppercase, lowercase, number & special.";
          }
          break;
        case "specialty":
          if (value === "") {
            message = "Please select a specialty.";
          }
          break;
        default:
          message = "";
      }
    }

    setError((prev) => ({ ...prev, [field]: message }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prev) => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasErrors = false;
    Object.entries(doctorData).forEach(([field, value]) => {
      validate(field, value);
      if (!value || error[field]) hasErrors = true;
    });

    if (hasErrors) return;

    onSubmit(doctorData);
    setDoctorData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      specialty: ""
    });
    setError({});
  };

  const specialties = [
    "Dentist",
    "Cardiologist",
    "Neurologist",
    "Pediatrician",
    "Dermatologist",
    "Orthopedic",
    "Psychiatrist",
    "Ophthalmologist",
    "Gynecologist"
  ];

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            className="modal fade d-block"
            tabIndex="-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
              zIndex: 1050
            }}
          >
            <motion.div
              className="modal-dialog modal-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="modal-content shadow"
                style={{
                  borderRadius: "16px",
                  backgroundColor: "#f9f9f9",
                  padding: "30px"
                }}
              >
                <div className="modal-header border-0 pb-0">
                  <h5 className="modal-title fw-bold text-primary mx-auto">
                    {initialData ? "Edit Doctor Info" : "Register New Doctor"}
                  </h5>
                </div>

                <div className="modal-body pt-3">
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          className={`form-control rounded-3 ${error.firstName ? "is-invalid" : ""}`}
                          value={doctorData.firstName}
                          onChange={handleChange}
                          style = {{width : '300px'}}
                        />
                        {error.firstName && (
                          <div className="invalid-feedback">{error.firstName}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          className={`form-control rounded-3 ${error.lastName ? "is-invalid" : ""}`}
                          value={doctorData.lastName}
                          onChange={handleChange}
                          style={{width : '300px'}}
                        />
                        {error.lastName && (
                          <div className="invalid-feedback">{error.lastName}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Email</label>
                        <input
                          type="email"
                          name="email"
                          className={`form-control rounded-3 ${error.email ? "is-invalid" : ""}`}
                          value={doctorData.email}
                          onChange={handleChange}
                          style={{width : '300px'}}
                        />
                        {error.email && (
                          <div className="invalid-feedback">{error.email}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Phone</label>
                        <input
                          type="text"
                          name="phone"
                          className={`form-control rounded-3 ${error.phone ? "is-invalid" : ""}`}
                          value={doctorData.phone}
                          onChange={handleChange}
                          style={{width : '300px'}}
                        />
                        {error.phone && (
                          <div className="invalid-feedback">{error.phone}</div>
                        )}
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">Password</label>
                        <input
                          type="password"
                          name="password"
                          className={`form-control rounded-3 ${error.password ? "is-invalid" : ""}`}
                          value={doctorData.password}
                          onChange={handleChange}
                        />
                        {error.password && (
                          <div className="invalid-feedback">{error.password}</div>
                        )}
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">Specialty</label>
                        <select
                          className={`form-select rounded-3 ${error.specialty ? "is-invalid" : ""}`}
                          name="specialty"
                          value={doctorData.specialty}
                          onChange={handleChange}
                        >
                          <option value="">Select specialty</option>
                          {specialties.map((s, index) => (
                            <option key={index} value={index}>
                              {s}
                            </option>
                          ))}
                        </select>
                        {error.specialty && (
                          <div className="invalid-feedback">{error.specialty}</div>
                        )}
                      </div>
                    </div>

                    <div className="modal-footer mt-4 border-0 px-0 d-flex justify-content-end">
                      <button
                        type="button"
                        className="btn btn-outline-secondary rounded-3 me-2"
                        onClick={onClose}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary rounded-3">
                        {initialData ? "Update Doctor" : "Add Doctor"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export { DoctorForm };
