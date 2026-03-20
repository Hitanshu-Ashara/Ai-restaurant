import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleRating = (r) => {
    setRating(r);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#111111",
      color: "#F5F0E8",
      fontFamily: "'Outfit', sans-serif",
      padding: "0 24px 64px",
    }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        
        {/* Header */}
        <header style={{ padding: "32px 0", display: "flex", alignItems: "center", gap: "20px" }}>
          <button 
            onClick={() => navigate("/menu")}
            style={{ 
              width: "44px", height: "44px", borderRadius: "12px", 
              border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)",
              color: "#9A9080", cursor: "pointer", fontSize: "18px"
            }}
          >
            ←
          </button>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 500 }}>Feedback</h1>
            <p style={{ color: "#5A5248", fontSize: "14px" }}>Share your experience with our AI assistant.</p>
          </div>
        </header>

        {/* Feedback Section */}
        <section style={{ 
          background: "linear-gradient(135deg, #1C1C1C, #161616)", 
          borderRadius: "24px", padding: "28px", 
          border: "1px solid rgba(255,255,255,0.05)",
          marginBottom: "40px", position: "relative", overflow: "hidden"
        }}>
          {!submitted ? (
            <>
              <div style={{ marginBottom: "32px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#C8956C", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>Rate your experience</h3>
                <div style={{ display: "flex", gap: "12px" }}>
                  {[1, 2, 3, 4, 5].map((r) => (
                    <button
                      key={r}
                      onClick={() => handleRating(r)}
                      style={{
                        width: "48px", height: "48px", borderRadius: "12px",
                        border: rating === r ? "1px solid #C8956C" : "1px solid rgba(255,255,255,0.08)",
                        background: rating === r ? "rgba(200,149,108,0.1)" : "rgba(255,255,255,0.03)",
                        color: rating === r ? "#C8956C" : "#9A9080",
                        fontSize: "20px", fontWeight: 700, cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "32px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#C8956C", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>Tell us more</h3>
                <textarea
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder="Your thoughts..."
                  style={{
                    width: "100%", height: "120px", borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)",
                    color: "#F5F0E8", fontSize: "15px", padding: "16px",
                    resize: "none", outline: "none", transition: "all 0.2s ease"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#C8956C"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={rating === 0}
                style={{
                  width: "100%", height: "56px", borderRadius: "14px",
                  border: "none", background: rating !== 0 ? "#C8956C" : "rgba(255,255,255,0.03)",
                  color: rating !== 0 ? "#fff" : "#5A5248", fontSize: "16px", fontWeight: 600,
                  cursor: rating !== 0 ? "pointer" : "not-allowed",
                  boxShadow: rating !== 0 ? "0 8px 24px rgba(200,149,108,0.3)" : "none",
                  transition: "all 0.2s ease"
                }}
              >
                Submit Feedback →
              </button>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "48px 0", animation: "fade-up 0.4s ease" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>✨</div>
              <h2 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "8px" }}>Thank you!</h2>
              <p style={{ color: "#5A5248", fontSize: "15px" }}>Your feedback helps us provide a better experience.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
