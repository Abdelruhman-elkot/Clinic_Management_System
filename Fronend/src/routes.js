import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import DoctorHome from "./pages/Doctor/DoctorHome/DoctorHome";
import PatientHome from "./pages/Patient/Home/PatientHome";
import ViewDoctors from "./pages/Patient/ViewDoctors/ViewDoctors";
import PatientManagment from "./pages/Doctor/Patient_managment/Patient_Managment";
import SpecialistsDoctors from "./pages/Patient/ViewDoctors/Components/SpecialistsDoctors";
import DoctorSchedulePage from "./pages/Doctor/DoctorSchedule/DoctorSchedulePage";
import MedicalHistory from "./pages/Patient/MedicalHistory/MedicalHistory";
import ErrorPage from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import ChatPage from "./pages/Chats/ChatPage";
import ProtectedRoute from "./ProtectedRoutes";
import ErrorAccessDeniedPage from "./pages/Error/ErrorAccessDenied";
import { Dashboard } from "./pages/Admin/Components/Dashboard/Dashboard";
import { DoctorTable } from "./pages/Admin/Components/Doctors/DoctorTable";
import { PatientAppointments } from "./pages/Admin/Components/Appointments/PatientAppointments";
import { DoctorSchedulesReport } from "./pages/Admin/Components/Doctor Schedules Reports/DoctorSchedulesReport";
import { PatientVisitsReport } from "./pages/Admin/Components/Patient Visits Reports/PatientVisitsReport";

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<SignUp></SignUp>}></Route>
            <Route path="/signin" element={<SignIn></SignIn>}></Route>


            {/* Patient Routes only */}
            <Route path="/patient/home" element={
                <ProtectedRoute allowedRoles={['Patient']}>
                    <PatientHome />
                </ProtectedRoute>}>
            </Route>

            <Route path="/patient/viewdoctors" element={
                <ProtectedRoute allowedRoles={['Patient']}>
                    <ViewDoctors />
                </ProtectedRoute>
            }></Route>

            <Route path="/patient/viewdoctors/:specialty" element={
                <ProtectedRoute allowedRoles={['Patient']}>
                    <SpecialistsDoctors />
                </ProtectedRoute>
            } />

            <Route path="/patient/medicalHistory" element={
                <ProtectedRoute allowedRoles={['Patient']}>
                    <MedicalHistory />
                </ProtectedRoute>
            } />


            {/* Doctor Routes Only */}
            <Route path="/doctor_home" element={
                <ProtectedRoute allowedRoles={['Doctor']}>
                    <DoctorHome></DoctorHome>
                </ProtectedRoute>}>
            </Route>

            <Route path="/doctor_home/patient_managment" element={
                <ProtectedRoute allowedRoles={'Doctor'}>
                    <PatientManagment></PatientManagment>
                </ProtectedRoute>
            }></Route>

            <Route path="/doctor_home/doctorSchedule" element={
                <ProtectedRoute allowedRoles={['Doctor']}>
                    <DoctorSchedulePage></DoctorSchedulePage>
                </ProtectedRoute>
            }></Route>

            {/* Doctor And Patient Routes */}
            <Route path="/chats" element={
                <ProtectedRoute allowedRoles={['Doctor', 'Patient']}>
                    <ChatPage />
                </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/dashboard" element={
                <ProtectedRoute allowedRoles={['Admin']}>
                    <Dashboard />
                </ProtectedRoute>
            } />

            <Route path="/schedules" element={
                <ProtectedRoute allowedRoles={['Admin']}>
                    <DoctorSchedulesReport />
                </ProtectedRoute>
            } />

            <Route path="/patients" element={
                <ProtectedRoute allowedRoles={['Admin']}>
                    <PatientAppointments />
                </ProtectedRoute>
            } />


            <Route path="/visits" element={
                <ProtectedRoute allowedRoles={['Admin']}>
                    <PatientVisitsReport />
                </ProtectedRoute>
            } />


            <Route path="/doctors" element={
                <ProtectedRoute allowedRoles={['Admin']}>
                    <DoctorTable />
                </ProtectedRoute>
            } />



            <Route path="/access-denied" element={<ErrorAccessDeniedPage />} />

            {/* Wildcard Route for 404 - url not found */}
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}

export default AppRoutes;