import { Image } from "react-bootstrap";
import Colors from "../../../../core/Constants/Colors";
import TitleWithHr from "../../../../core/components/TitleWithHr/TitleWithHr";
import image from "../../../../assets/images/profile.jpg";

function MedicalRecords({ medicalRecords }) {
  return (
    <div className="col-12 mt-5">
      <TitleWithHr title="Medical History" fontSize="35px" />
      <div
        className="row"
        style={{
          width: "85vw",
          minHeight: "100vh",
          background: `linear-gradient(135deg, ${Colors.secondaryLight}, ${Colors.secondary})`,
          borderTopLeftRadius: "80px",
          borderTopRightRadius: "80px",
          padding: "40px 20px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          marginTop: "0",
          position: "relative",
          overflowX: "hidden",
        }}
      >

        {(!medicalRecords || medicalRecords.length === 0) ? (
          <div className="text-center mt-5">
            <h4>No medical records available</h4>
            <p>Your medical history will appear here after your doctor adds records.</p>
          </div>
        ) : medicalRecords?.map((record, idx) => (
          <div
            key={record.recordId}
            className="col-12 mb-3"
            data-aos="fade-up"
            data-aos-delay={idx * 100}
          >
            <div
              className="card shadow-sm border-0 p-3 d-flex flex-row align-items-start"
              style={{
                backgroundColor: Colors.white,
                color: Colors.textPrimary,
                borderRadius: "10px",
                minHeight: "120px",
                height: "auto",
                padding: "12px",
              }}
            >
              <Image
                src={image}
                roundedCircle
                width={80}
                height={80}
                className="me-4"
                alt={record.doctorName}
              />
              <div className="flex-grow-1">
                <h5 className="fw-bold mb-1" style={{ color: Colors.primary }}>
                  {record.doctorName}
                </h5>
                <small className="text-muted">Record ID: {record.recordId}</small>

                <div className="mt-3">
                  {(record.diagnosis !== "") ? (
                    <><strong style={{ color: Colors.success }}>Diagnosis:</strong>
                    <p className="mb-2">{record.diagnosis}</p>
                    <strong style={{ color: Colors.warning }}>Prescription:</strong>
                    <p className="mb-0">{record.prescription}</p></>
                  ) : (
                  <>
                    <strong style={{ color: Colors.warning }}>Prescription:</strong><p className="mb-0">{record.prescription}</p>
                  </> )

                  }

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MedicalRecords;
