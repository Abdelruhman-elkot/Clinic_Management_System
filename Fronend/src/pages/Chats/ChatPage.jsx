import { useContext, useState, useEffect } from "react";
import ChatScreen from "./Components/ChatScreen/ChatScreen";
import SideBar from "./Components/SideBar/Sidebar";
import { MainContainer } from "@chatscope/chat-ui-kit-react";
import { UserContext } from "../../core/contexts/UserContext";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { getAppointemnts } from "../../core/services/patientServices";
import { getPatientsByDoctor } from "../../core/services/doctorService";
import photo from "../../assets/images/drchat.jpg";
import { useNavigate } from "react-router-dom";
import Colors from "../../core/Constants/Colors";

function ChatPage() {
    const user = useContext(UserContext);
    const navigate = useNavigate();
    const [chatUsers, setChatUsers] = useState([]);
    const [targetUser, setTargetUser] = useState(null);
    const [targetUserId, setTargetUserId] = useState();
    console.log("user: ", user.user.name);
    console.log("usr role: ", user.user.role);

    const formatUsername = (name) => {
        return name ? name.toLowerCase().trim() : null;
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                if (user?.user.role === "Patient") {
                    console.log("this is patient");
                    const doctors = await getAppointemnts(user.user.id)
                    console.log("Doctor", doctors);
                    const formatted = doctors
                        .filter(doc => doc.status === "Approved")
                        .map(doc => ({
                            name: doc.doctorName.replace(/\s/g, ""),
                            id: doc.doctorId,
                        }));

                    setChatUsers(formatted);
                    setTargetUser(formatUsername(formatted[0]?.name) ?? null);
                    setTargetUserId(formatted[0]?.id ?? null);
                    console.log("target id: ", targetUserId);
                    console.log("user id: ", user.user.id);
                } else if (user?.user.role === "Doctor") {
                    console.log("this is doctor");
                    const appointments = await getPatientsByDoctor(user.user.id);
                    const formatted = appointments.map((appt) => ({
                        name: appt.username,
                        appointmentId: appt.medicalComplaint,
                        id: appt.patientId,
                    }));
                    setChatUsers(formatted);
                    setTargetUser(formatUsername(formatted[0]?.name) ?? null);
                    setTargetUserId(formatted[0]?.id ?? null);
                    console.log("target id: ", targetUserId);
                    console.log("user id: ", user.user.id);
                }
            } catch (error) {
                console.error("Error fetching chat users:", error);
            }
        };

        fetchUsers();
    }, [user]);
    console.log(chatUsers);
    useEffect(() => {
        if (targetUserId !== undefined) {
            console.log("Updated targetUserId:", targetUserId);
        }
    }, [targetUserId]);

    return (
        <div className="app-container" style={{ width: "100vw", height: "100vh" }}>
            {chatUsers.length === 0 ? (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        textAlign: "center",
                        padding: "2rem",
                    }}
                >
                    <img
                        src={photo}
                        alt="No chats yet"
                        style={{ maxWidth: "300px", marginBottom: "2rem" }}
                    />
                    {user.user.role === "Patient" ? (
                         <h3 style={{ color: "#666" }}>“You don't have any doctors yet. Go Book an appointment first.”</h3>

                    ) : (
                         <h3 style={{ color: "#666" }}>“You don't have any patients yet.”</h3>

                    )}
                   
                    <button
                        onClick={() =>
                            navigate(
                                user.user.role === "Patient" ? "/patient/home" : "/doctor_home"
                            )
                        }
                        style={{
                            marginTop: "1.5rem",
                            backgroundColor: Colors.primary,
                            color: "#fff",
                            border: "none",
                            padding: "0.75rem 1.5rem",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}
                    >
                        Return to Home
                    </button>
                </div>
            ) : (
                <MainContainer responsive>
                    <SideBar
                        users={chatUsers}
                        onSelectUser={(user) => {
                            console.log("Selected user from sidebar:", user);
                            setTargetUser(formatUsername(user.name));
                            setTargetUserId(user.id);
                        }}
                        selectedUserId={targetUserId}
                    />
                    <ChatScreen
                        key={targetUserId}
                        senderUsername={formatUsername(user.user.name)}
                        targetUser={targetUser}
                        senderID={user.user.id}
                        targetID={targetUserId}
                    />
                </MainContainer>
            )}
        </div>
    );
}

export default ChatPage;
