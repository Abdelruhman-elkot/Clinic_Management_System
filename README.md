# Clinic Management System

*A modern platform to streamline clinic operations, enhance patient-doctor interactions, and improve administrative efficiency.*

---

## 🎥 Demo

👉 [**Watch the Demo Video**](https://drive.google.com/file/d/1pXo4ontJWHOFF0wQCgZ8rObGvHnTG78l/view?usp=sharing)

## 🚀 Features

### **For Clinic Administrators**
- ✅ **Manage Doctors**: Add, update, or delete doctor profiles.
- 📅 **Schedule Management**: Assign doctors to specific time slots.
- 📊 **Reporting**: Generate reports on appointments, patient visits, and doctor schedules.
- 🔄 **Appointment Oversight**: Approve, reschedule, or cancel patient appointments.

### **For Doctors**
- 🩺 **Patient Records**: Update medical histories and add prescriptions.
- 📆 **Appointment Tracking**: View and manage daily schedules.
- 💬 **Real-Time Chat**: Communicate with patients via WebSocket-based messaging.

### **For Patients**
- 🏥 **Easy Registration**: Sign up and log in securely.
- 📅 **Appointment Booking**: Book, reschedule, or cancel appointments.
- 📋 **Medical History**: Access prescriptions and past records.
- ✉️ **Notifications**: Receive SMS alerts (Twilio) for appointment confirmations.

---

## 🛠️ Tech Stack

### **Frontend**
- **ReactJS** (Dynamic UI)  
- **Redux** (State Management)  
- **Material-UI** (Styling)  

### **Backend**
- **.NET Core** (RESTful API)  
- **Entity Framework** (Database ORM)  
- **JWT** (Authentication)  

### **Real-Time & Integrations**
- **WebSocket** (Live chat between patients and doctors)  
- **Twilio** (SMS notifications)  

### **Database**
- **SQL Server** (Relational database for structured data)  

---

## 📂 Project Structure

```bash
Clinic_Management_System/
├── ClientApp/               # ReactJS frontend
├── Controllers/             # ASP.NET API Controllers
├── Models/                  # Entity Framework models
├── Services/                # JWT, Twilio, WebSocket services
├── Migrations/              # Database migrations
├── Program.cs               # Main application entry
└── appsettings.json         # Configuration and secrets


---

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v14+) for frontend
- .NET 6 SDK for backend
- SQL Server (or Docker for containerized DB)

### **Installation**
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Abdelruhman-elkot/Clinic_Management_System.git

2. **Backend Setup**:
cd Server
dotnet restore
dotnet ef database update  # Apply migrations
dotnet run

3. **Frontend Setup**:
cd Client
npm install
npm start

🤝 Team
Role	Contributors
Frontend	Rodina Tharwat, Ziad Yasser, Farah Hossam
Backend	Abdelrahman Ibrahim, Ganna Wessam
