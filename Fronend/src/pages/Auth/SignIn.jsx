import TextField from "../../core/components/Text Field/TextField";
import "../../core/components/Text Field/TextField.css";
import "../../core/components/AuthButton/AuthButton.css";
import AuthButton from "../../core/components/AuthButton/AuthButton";
import { useState, useContext } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../core/services/authServices"; 
import { UserContext } from "../../core/contexts/UserContext";
import Swal from 'sweetalert2';
function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);

  const handleLogin = async () => {
    try {

      const userData = await login(email, password);
      // save user data in user context 
      setUser(userData);

      // show alert 
      Swal.fire({
        title: 'Welcome!',
        text: 'You have successfully logged in.',
        icon: 'success',
        confirmButtonText: 'Continue',
      });

      // redirect according to the role 
      if (userData.role === "Patient") {
        navigate("/patient/home");
      } else if (userData.role === "Doctor") {
        navigate("/doctor_home");
      } else if (userData.role === "Admin"){
        navigate("/dashboard")
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      // show alert failed 
      Swal.fire({
        title: 'Oops!',
        text: 'Login failed. Please check your credentials.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h3 className="text-title">Sign In</h3>
        <TextField
          label="Email"
          type="text"
          placeholder=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Your password"
          type="password"
          placeholder=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <AuthButton text="Log in" isDisabled={!email || !password}    onClick={handleLogin}/>

        <p className="text-subtitle">
          By continuing, you agree to the Terms of use and Privacy Policy.
        </p>

        <div className="d-flex align-items-center my-3">
          <hr className="flex-grow-1" />
          <span className="mx-2 text-muted">New Patient ? Register now</span>
          <hr className="flex-grow-1" />
        </div>

        <AuthButton
          text="Sign Up"
          isOutlined={true}
          onClick={() => navigate("/signup")}
        ></AuthButton>
      </div>
    </div>
  );
}

export default SignIn;
