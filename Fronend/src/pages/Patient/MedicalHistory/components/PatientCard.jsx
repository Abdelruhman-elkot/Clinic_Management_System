import { Image } from "react-bootstrap";
import Colors from "../../../../core/Constants/Colors";
import image from "../../../../assets/images/profile.jpg";

function PatientCard({ name, id }) {
  return (
    <div
      className="card shadow text-center p-3 border-0"
      style={{
        backgroundColor: Colors.secondaryLight,
        color: Colors.textPrimary,
      }}
    >
      <Image
        src={image}
        roundedCircle
        width={100}
        height={100}
        className="mx-auto mb-3"
        alt="User profile"
      />
      <h4 className="mb-1" style={{ color: Colors.textPrimary }}>
        {name}
      </h4>
      <p className="mb-0" style={{ color: Colors.textMuted }}>
        ID: {id}
      </p>
    </div>
  );
}

export default PatientCard;
