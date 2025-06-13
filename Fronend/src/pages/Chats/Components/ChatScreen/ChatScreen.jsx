import {
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    ConversationHeader,
    Avatar,
} from "@chatscope/chat-ui-kit-react";
import React, { useEffect, useRef, useState } from "react";
import './ChatScreen.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import Colors from "../../../../core/Constants/Colors";
// ... [الاستيراد زي ما هو فوق]

function ChatScreen({ senderUsername, targetUser, senderID, targetID }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isTargetOnline, setIsTargetOnline] = useState(false);
    const socketRef = useRef(null);
    const historyLoaded = useRef(false);
    const isFirstLoad = useRef(true);

    useEffect(() => {
        console.log("ChatScreen mounted with senderID:", senderID, "targetID:", targetID);
        setMessages([]);
        historyLoaded.current = false;
        isFirstLoad.current = true;
        setIsTargetOnline(false);

        socketRef.current = new WebSocket('ws://localhost:8181');

        socketRef.current.onopen = () => {
            console.log("WebSocket Connected");

            // 1. Load history
            if (!historyLoaded.current && senderID && targetID) {
                const firstMessPayload = `firstMess:${senderID}:${targetID}:`;
                socketRef.current.send(firstMessPayload);
                historyLoaded.current = true;
            }

            // 2. Check if target is online
            if (senderID && targetID) {
                const checkOnlinePayload = `checkOnline:${senderID}:${targetID}:`;
                socketRef.current.send(checkOnlinePayload);
            }
        };

        socketRef.current.onmessage = (event) => {
            const data = event.data;
            console.log('[WebSocket] Received:', data);

            const match = data.match(/^\[(.+?)\] to \[(.+?)\]: (.+)$/);
            if (match) {
                const [, sender, receiver, message] = match;
                const isMe = String(sender) === String(senderID);

                setMessages((prev) =>
                    isFirstLoad.current
                        ? [{ message, sender: isMe ? "user" : "other" }]
                        : [...prev, { message, sender: isMe ? "user" : "other" }]
                );

                if (isFirstLoad.current) {
                    isFirstLoad.current = false;
                }

                return;
            }

            // System messages
            if (data.startsWith("[System]")) {
                console.log("[System]", data);

                const onlineMatch = data.match(/\[System\] online:(\d+)/);
                const offlineMatch = data.match(/\[System\] offline:(\d+)/);
                const statusMatch = data.match(/\[System\] status:(\d+):(online|offline)/);

                if (onlineMatch && onlineMatch[1] === String(targetID)) {
                    setIsTargetOnline(true);
                }

                if (offlineMatch && offlineMatch[1] === String(targetID)) {
                    setIsTargetOnline(false);
                }

                if (statusMatch && statusMatch[1] === String(targetID)) {
                    setIsTargetOnline(statusMatch[2] === "online");
                }
            }
        };

        socketRef.current.onerror = (error) => {
            console.error("[WebSocket] Error:", error);
        };

        socketRef.current.onclose = () => {
            console.log("[WebSocket] Disconnected");
        };

        return () => {
            socketRef.current?.close();
        };
    }, [senderID, targetID]);

    const handleSend = (text) => {
        if (!text.trim()) return;

        const formattedMessage = `sendMess:${senderID}:${targetID}:${text}`;
        socketRef.current.send(formattedMessage);

        setMessages((prev) => [
            ...prev,
            { message: text, sender: "user" }
        ]);

        setNewMessage("");
    };

    return (
        <ChatContainer>
    <ConversationHeader style={{ backgroundColor: Colors.secondary }}>
        <ConversationHeader.Back />
        <Avatar
            name={targetUser}
            src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
            size="md"
            status={isTargetOnline ? "available" : "invisible"}
        />
        <ConversationHeader.Content>
            <span style={{
                alignSelf: 'flex-center',
                color: Colors.black,
                fontSize: '20px',
                fontWeight: 'bold',
                backgroundColor: Colors.secondary
            }}>
                {targetUser.charAt(0).toUpperCase() + targetUser.slice(1)}
            </span>
            <div style={{
                fontSize: "0.9rem",
                color: isTargetOnline ? "green" : "gray",
                marginTop: "4px"
            }}>
                {isTargetOnline ? "Online now" : "Offline"}
            </div>
        </ConversationHeader.Content>
    </ConversationHeader>


            <MessageList>
                {messages.length === 0 ? (
                    <div style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        color: "#666",
                        textAlign: 'center'
                    }}>
                        There are no messages yet.<br />Start Chat Now. 🗣️
                    </div>
                ) : (
                    messages.map((msg, i) => (
                        <Message
                            key={i}
                            model={{
                                message: msg.message,
                                sentTime: "just now",
                                sender: msg.sender === "user" ? "You" : targetUser,
                                direction: msg.sender === "user" ? "outgoing" : "incoming",
                                position: "single",
                            }}
                        />
                    ))
                )}
            </MessageList>

            <MessageInput
                placeholder="Type message here"
                value={newMessage}
                onChange={(val) => setNewMessage(val)}
                onSend={() => handleSend(newMessage)}
                attachButton={false}
            />
        </ChatContainer>
    );
}

export default ChatScreen;
