import { useNavigate } from "react-router-dom";
import Colors from "../../../../core/Constants/Colors";

function FindDoctor() {
  const navigate = useNavigate();

  return (
    <div
      className="card shadow p-3 text-center border-0"
      style={{ backgroundColor: Colors.secondary }}
    >
      <h6 className="mb-3" style={{ color: Colors.textPrimary }}>
        You need a doctor?
      </h6>
      <button
        className="btn fw-semibold"
        style={{
          backgroundColor: Colors.warning,
          color: Colors.white,
        }}
        onClick={() => navigate("/patient/viewdoctors")}
      >
        Find Doctors
      </button>
    </div>
  );
}

export default FindDoctor;
