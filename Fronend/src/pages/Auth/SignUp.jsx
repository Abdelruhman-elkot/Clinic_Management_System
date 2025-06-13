import TextField from "../../core/components/Text Field/TextField";
import "../../core/components/Text Field/TextField.css";
import "../../core/components/AuthButton/AuthButton.css";
import AuthButton from "../../core/components/AuthButton/AuthButton";
import { useState } from "react";
import "./Auth.css";
import StepNavigation from "./RegisterStepNav";
import { useNavigate } from "react-router-dom";
import { register } from "../../core/services/authServices";
import Swal from 'sweetalert2';

// SignUp.jsx

export function FirstStep({
  firstName, setFirstName,
  lastName, setLastName,
  email, setEmail,
  password, setPassword
}) {
  return (
    <>
      <TextField
        label="First Name"
        name="firstName"
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        label="Last Name"
        name="lastName"
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </>
  );
}


export function SecondStep({
  gender, setGender,
  phone, setPhone,
  age, setAge
}) {
  return (
    <>
      <label className="form-label">Gender</label>
      <select
        name="gender"
        className="form-select mb-3"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">Select Gender</option>
        <option value={0}>Male</option>
        <option value={1}>Female</option>

      </select>

      <TextField
        label="Phone Number"
        name="phone"
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <TextField
        label="Age"
        name="age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
    </>
  );
}

export function ThirdStep({
  chronicDiseases, setChronicDiseases,
  medicalComplaint, setMedicalComplaint
}) {
  return (
    <>
      <label className="form-label">Chronic Diseases</label>
      <select
        name="chronicDiseases"
        className="form-select mb-3"
        value={chronicDiseases}
        onChange={(e) => setChronicDiseases(e.target.value)}
      >
        <option value="">Select Chronic Diseases</option>
        <option value="none">None</option>
        <option value="diabetes">Diabetes</option>
        <option value="blood pressure">Blood Pressure</option>
      </select>

      <TextField
        name="medicalComplaint"
        label="Medical Complaint"
        type="text"
        value={medicalComplaint}
        onChange={(e) => setMedicalComplaint(e.target.value)}
      />
    </>
  );
}

function SignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [chronicDiseases, setChronicDiseases] = useState("");
  const [medicalComplaint, setMedicalComplaint] = useState("");

  const handleSubmit = async () => {
    const formData = {
      firstName,
      lastName,
      password,
      email,
      phoneNumber: phone,
      gender: Number(gender),
      age: Number(age),
      chronicDiseases,
      medicalComplaint,
    };


    try {
      await register(formData);
    
     await Swal.fire({
              title: 'Welcome!',
              text: 'You have successfully registered. Log in to continue',
              icon: 'success',
              confirmButtonText: 'Continue',
      });

      navigate("/signin");
    } catch (error) {
      console.error("Registration error:", error);
      // alert("Registration failed. Please try again.");
      await Swal.fire({
              title: 'Oops!',
              text: 'An error occured. Please try again!',
              icon: 'error',
              confirmButtonText: 'Try Again',
            });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <FirstStep 
          firstName={firstName} setFirstName={setFirstName}
          lastName={lastName} setLastName={setLastName}
          email={email} setEmail={setEmail}
          password={password} setPassword={setPassword}
        />;
      case 2:
        return <SecondStep 
          gender={gender} setGender={setGender}
          phone={phone} setPhone={setPhone}
          age={age} setAge={setAge}
        />;
      case 3:
        return <ThirdStep 
          chronicDiseases={chronicDiseases} setChronicDiseases={setChronicDiseases}
          medicalComplaint={medicalComplaint} setMedicalComplaint={setMedicalComplaint}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h3 className="text-title">Sign Up</h3>
        <p className="text-center text-muted mb-4">Create a patient account</p>

        {renderStep()}

        <StepNavigation
          step={step}
          setStep={setStep}
          handleSubmit={handleSubmit}
        />

        <div className="d-flex align-items-center my-3">
          <hr className="flex-grow-1" />
          <span className="mx-2 text-muted">Already have an account?</span>
          <hr className="flex-grow-1" />
        </div>

        <AuthButton
          text="Sign In"
          isOutlined={true}
          onClick={() => navigate("/signin")}
        />
      </div>
    </div>
  );
}

export default SignUp;

