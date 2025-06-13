import React from "react";
import {
  Sidebar,
  ConversationList,
  Conversation,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import Colors from "../../../../core/Constants/Colors";

function SideBar({ users = [], onSelectUser, selectedUserId }) {
  const fallbackAvatar = "https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"


  return (
    <Sidebar position="left" scrollable={true} style={{
      backgroundColor: Colors.secondary,
      color: Colors.white,
      fontSize: '18px'

    }}>
      <div
        style={{
          padding: "16px",
          fontWeight: "bold",
          fontSize: "30px",
          color: Colors.black, // لون نيون (سماوي)
          textShadow: "0 0 2px #fff, 0 0 2px #fff, 0 0 2px #fff"
        }}
      >        Chats 🧑🏻‍⚕️
      </div>

      <ConversationList>
        {users.map((user, index) => {
          const isSelected = selectedUserId === user.id;

          return (
            <Conversation
              key={index}
              name={user.name}
              info={user.email ? user.email : user.appointmentId}
              onClick={() => onSelectUser(user)}
              style={{
                backgroundColor: isSelected ? Colors.secondaryLight : "transparent", // darken when selected
                borderRadius: "8px",
                margin: "4px",
                cursor: "pointer"
              }}
            >
              <Avatar
                src={fallbackAvatar}
                name={user.name}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />
            </Conversation>
          );
        })}
      </ConversationList>
    </Sidebar>
  );
}


export default SideBar;

