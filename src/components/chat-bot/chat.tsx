import { useState } from "react";
import "./chat.module.scss";

const Chat = () => {
  const url = `https://suku-fi-chat-bot-097bd90d5893.herokuapp.com/`;
  const [chatOpen, setChatOpen] = useState(false);

  const handleCloseClick = () => {
    setChatOpen(false);
  };

  return (
    <>
      <div
        className="chat--widget-button"
        style={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          width: "120px",
          height: "120px",
          textAlign: "center",
          borderRadius: "50%",
          overflow: "hidden",
          display: chatOpen ? "none" : "block",
          background: "#013220",
        }}
        onClick={() => setChatOpen(true)}
      >
        <div
          className="chat--inner-content-container"
          style={{
            display: "block",
            position: "absolute",
            left: "0",
            right: "50%",
            top: "50%",
            bottom: "auto",
            margin: "auto",
            transform: "translateY(-50%)",
          }}
        >
          <i className="fa fa-comment-o chat--icon" aria-hidden="true">
            <ul style={{ display: "flex", listStyle: "none", padding: 0 }}>
              <li className="one--dot" style={{ marginRight: "5px" }}>
                .
              </li>
              <li className="two--dot" style={{ marginRight: "5px" }}>
                .
              </li>
              <li className="three--dot" style={{ marginRight: "5px" }}>
                .
              </li>
            </ul>
          </i>
        </div>

        <div
          className="chat--inner-content-container"
          style={{
            display: "block",
            position: "absolute",
            left: "0",
            right: "0",
            top: "50%",
            bottom: "auto",
            margin: "auto",
            marginTop: "10px",
            transform: "translateY(-50%)",
          }}
        >
          AI CHAT
        </div>
      </div>

      <div>
        {chatOpen && (
          <div
            style={{
              position: "fixed",
              bottom: "40px",
              right: "40px",
              textAlign: "center",
              overflow: "hidden",
              zIndex: "999",
            }}
          >
            <iframe
              onClick={() => console.log("aaaa")}
              src={url}
              title="Frame Sayfası"
              width="400px"
              height="500px"
            ></iframe>
            <button
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                padding: "10px  10px",
                backgroundColor: "#B71C1C",
                color: "white",
                border: "none",
                cursor: "pointer",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
              onClick={handleCloseClick}
            >
              X
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Chat;
