import axios from "axios";

export const getAppointemnts = async (id) => {
    try {
        const response = await axios.get(`https://localhost:7151/api/Appointments/patient/${id}`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching appointments: ', error);
        return [];
    }
};

export const getMedicalRecords = async (id) => {

    try  {
        const response = await axios.get(`https://localhost:7151/api/MedicalRecords/patient/${id}`);
        return response.data;
    }

    catch (error) {
        console.error('Error while fetching medical records: ', error);
        return null;
    }
}


export const cancelAppointment = async (appointmentId) => {
    try {
        const response = await axios.put(`https://localhost:7151/api/Appointments/${appointmentId}/cancel`);
        return response;
    } catch (error) {
        console.error('Error canceling appointment: ', error);
        throw error;
    }
}

export const getDoctorAvailabiltyForRescheduling = async (doctorId) => {
    try {
        const response = await axios.get(`https://localhost:7151/api/Admin/doctors/${doctorId}/availability`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching doctor availability: ', error);
        throw error;
    }
};



export const rescheduleAppointment = async (appointmentId, newAppointmentDayIndex, newTimeSlotIndex) => {
    return axios.put(`https://localhost:7151/api/Appointments/${appointmentId}/reschedule`, {
        newAppointmentDay: newAppointmentDayIndex,
        newTime: newTimeSlotIndex
    });
};

export const getDoctors = async () => {
    try {
        const response = await axios.get(`https://localhost:7151/api/Admin/doctors`);
        console.log('respnse: ', response.data)
        return response.data;
    } catch (error) {
        console.log("Error getting doctors: ", error);
        throw error;
    }
}


export const getDoctorsBySpeciality = async (specialty) => {
    try {
        const response = await fetch(`https://localhost:7151/api/Doctor/getDoctorsBySpeciality/${specialty}`, {
        method: 'GET',
        headers: {
            'accept': '*/*',
        },
        });

        if (!response.ok) {
        throw new Error('Failed to fetch doctors');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching doctors by speciality:', error);
        return [];
    }
};


export const bookAppointment = async (appointmentData) => {
    try {
        const response = await axios.post('https://localhost:7151/api/Appointments/book', appointmentData);
        return response.data;
    } catch (error) {
        console.error('Booking error:', error);
        throw error;
    }
};


export const getDoctorsCountBySpecialty = async () => {
    const response = await axios.get("https://localhost:7151/api/Admin/doctors");
    const doctors = response.data;

    const countMap = {};

    doctors
        .filter(doctor => Array.isArray(doctor.availableDays) && doctor.availableDays.length > 0)
        .forEach(doctor => {
            const spec = doctor.specialization;
            countMap[spec] = (countMap[spec] || 0) + 1;
        });

    return countMap;
};