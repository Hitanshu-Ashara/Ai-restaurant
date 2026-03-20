import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function IdleScreen() {
  const navigate = useNavigate();
  const [tapped, setTapped] = useState(false);

  const handleTap = () => {
    setTapped(true);
    setTimeout(() => navigate("/menu"), 600);
  };

  return (
    <div
      onClick={handleTap}
      style={{
        height: "100vh",
        background: "#111111",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* Background ambient glow */}
      <div style={{
        position: "absolute",
        width: "600px", height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,149,108,0.08) 0%, transparent 70%)",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }} />

      {/* Logo area */}
      <div style={{ textAlign: "center", animation: "fade-up 0.8s ease forwards" }}>
        <div style={{
          width: "80px", height: "80px",
          borderRadius: "24px",
          background: "linear-gradient(135deg, #C8956C, #9B6B45)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 32px",
          fontSize: "36px",
          boxShadow: "0 0 60px rgba(200,149,108,0.3)",
        }}>
          ☕
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "52px",
          fontWeight: 500,
          color: "#F5F0E8",
          letterSpacing: "-0.02em",
          lineHeight: "1.1",
          marginBottom: "12px",
        }}>
          D&D Café
        </h1>
        <p style={{
          fontSize: "16px",
          color: "#9A9080",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          fontWeight: 400,
          marginBottom: "64px",
        }}>
          AI Table Ordering
        </p>

        {/* Tap indicator */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          opacity: tapped ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}>
          <div style={{
            width: "64px", height: "64px",
            borderRadius: "50%",
            border: "2px solid rgba(200,149,108,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "pulse-ring 2s infinite",
          }}>
            <div style={{
              width: "40px", height: "40px",
              borderRadius: "50%",
              background: "rgba(200,149,108,0.15)",
              border: "1px solid rgba(200,149,108,0.6)",
            }} />
          </div>
          <p style={{ fontSize: "14px", color: "#5A5248", letterSpacing: "0.1em" }}>
            TAP ANYWHERE TO BEGIN
          </p>
        </div>
      </div>
    </div>
  );
}
