import axios from 'axios';

// Create an Axios instance with base URL and default headers
const api = axios.create({
  baseURL: 'https://localhost:7151/api',
  headers: {
    'accept': 'application/json',
  },
});

// Fetch appointments for a doctor by ID
export async function getAppointmentsByDoctor(doctorId) {
  try {
    const response = await api.get(`/Appointments/doctor/${doctorId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return null;
  }
}

// Fetch patients assigned to a doctor by ID
export async function getPatientsByDoctor(doctorId) {
  try {
    const response = await api.get(`/Doctor/viewPatientsData/${doctorId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    return null;
  }
}

export async function sendPrescription(doctorId, patientId, prescriptionText) {
  try {
    const response = await api.patch(
      `/Doctor/updatePrescription/${doctorId}/${patientId}`,
      JSON.stringify(prescriptionText), // wrap the string in JSON format
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending prescription:", error);
    return null;
  }
}


