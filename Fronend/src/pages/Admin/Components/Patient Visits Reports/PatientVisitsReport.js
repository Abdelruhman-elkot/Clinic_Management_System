import { motion, AnimatePresence } from "framer-motion";
import { TbReportSearch } from 'react-icons/tb';
import { useState, useEffect } from "react";
import { Margin, usePDF } from 'react-to-pdf';
import'./PatientVisitsReport.css'
import axios from "axios";

const headerVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

function PatientVisitsReport() {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:7151/api/Admin/reports/patient-visits").then((response) => {
        setVisits(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch patient visits:", error);
      });
  }, []);

     const { toPDF, targetRef } = usePDF({
    filename: 'patient-visits-report.pdf',
    page: { margin: Margin.MEDIUM, orientation: 'landscape' },
  });

  return (
   <div className="container mt-5 doctor-table-container">
            <motion.div
             className="d-flex align-items-center gap-3 px-4 py-3 rounded-3 mb-4 shadow-sm"
        style={{
          background: "linear-gradient(90deg, #e3f2fd, #bbdefb)",
          borderLeft: "6px solid #2196f3"
        }}
        variants={headerVariants}
        initial="hidden"
        animate="visible"
            >
   
           <div
               className="icon-box d-flex justify-content-center align-items-center rounded-circle"
               style={{
                 backgroundColor: "#2196f3",
                 width: "48px",
                 height: "48px",
                 color: "#fff",
                 fontSize: "1.5rem"
               }}
             >
              <TbReportSearch/>
             </div>
         <h2 className="m-0 fw-bold text-primary-emphasis">
      Patient Visits <span className="text-primary">Reports</span> </h2>
      <motion.button
          className="btn btn-primary rounded-5"
          onClick={ toPDF}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          Download
        </motion.button>
         </motion.div>
   
         <AnimatePresence>
           <motion.div
             key="doctor-table"
             initial={{ opacity: 0, scale: 0.95, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.95, y: 20 }}
             transition={{ duration: 0.4 }}>
              <div className="table-wrapper" ref={targetRef}>
             <table className="doctor-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Total Visits</th>
                <th>Last Visit Date</th>
                <th>Most Common Complaint</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {visits.map((pat, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <td>{index + 1}</td>
                    <td>{pat.patientName}</td>
                    <td>{pat.age}</td>
                    <td>{pat.gender}</td>
                    <td>{pat.totalVisits}</td>
                    <td>{pat.lastVisitDate ? pat.lastVisitDate : "Not Assigned"}</td>
                    <td>{pat.mostCommonComplaint}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export { PatientVisitsReport };
