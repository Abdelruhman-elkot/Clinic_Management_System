import axios from "axios";
import { jwtDecode } from "jwt-decode";

// const API_BASE_URL = "https://localhost:7151"; 

export const login = async (email, password) => {

  try {
    
    const response = await axios.post(`https://localhost:7151/api/Auth/login`, null, {
        params: { email, password },
      });
      console.log(email)
      console.log(password)

    const token = response.data.value; 
    const decodedToken = jwtDecode(token); 

    const role = decodedToken.role || decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    const id = decodedToken.nameid || decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/nameid"];
    const name = decodedToken.unique_name || decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/unique_name"];

    const userData = {
      email,
      role,
      token,
      id,
      name
    };

    console.log(userData.role)
    console.log(userData.id)
    console.log(userData.name)

    return userData; 
  } catch (error) {
    throw error;
  }
};


export const register = async (formData) => {
  try {
    console.log(formData);

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      password: formData.password,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      age: parseInt(formData.age),
      gender: parseInt(formData.gender),
      chronicDiseases: formData.chronicDiseases,
      medicalComplaint: formData.medicalComplaint,
    };
    console.log("Sending payload:", payload);

    const response = await axios.post(`https://localhost:7151/api/Auth/register`, payload,
  {
    headers: {
      "Content-Type": "application/json",
    }});

    console.log('Registered successfully');

    return response.data; 
  } catch (error) {
    throw error;
  }
};


