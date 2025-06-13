import React, { useEffect, useState } from 'react';
import { FaUserMd, FaCalendarCheck } from 'react-icons/fa';
import { GrSchedule } from "react-icons/gr";
import { TbReportSearch } from 'react-icons/tb';
import { DashboardCard } from './DashboardCard';
import { Title } from './Title';
import { Navbar } from '../../Components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

function Dashboard() {
  const [counts, setCounts] = useState({
    doctors: 0,
    patients: 0,
    schedules: 0,
    visits: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [doctorsRes, patientsRes, schedulesRes, visitsRes] = await Promise.all([
          axios.get("https://localhost:7151/api/Admin/doctors"),
          axios.get("https://localhost:7151/api/Appointments"),
          axios.get("https://localhost:7151/api/Admin/reports/doctor-schedules"),
          axios.get("https://localhost:7151/api/Admin/reports/patient-visits"),
        ]);

        setCounts({
          doctors: doctorsRes.data.length,
          patients: patientsRes.data.length,
          schedules: schedulesRes.data.length,
          visits: visitsRes.data.length,
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <Link to="/dashboard" style={{textDecoration : 'none'}}>
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <Title />
        <div className="d-flex flex-row flex-wrap justify-content-center w-100 gap-4 mt-4">
          <Link to="/doctors" style={{ textDecoration: 'none' }}>
            <DashboardCard
              icon={<FaUserMd  />}
              title="Manage Doctors"
              count={counts.doctors}
            />
          </Link>

          <Link to="/patients" style={{ textDecoration: 'none' }}>
            <DashboardCard
              icon={<FaCalendarCheck  />}
              title="Patient Appointments"
              count={counts.patients}
            />
          </Link>

          <Link to="/schedules" style={{ textDecoration: 'none' }}>
            <DashboardCard
              icon={<GrSchedule />}
              title="Doctor Schedules "
              count={counts.schedules}
            />
          </Link>

          <Link to="/visits" style={{ textDecoration: 'none' }}>
            <DashboardCard
              icon={<TbReportSearch  />}
              title="Patient Visits Reports"
              count={counts.visits}
            />
          </Link>
        </div>
      </div>
    </div>
    </Link>
  );
}

export { Dashboard };
