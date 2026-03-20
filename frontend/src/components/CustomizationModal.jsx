import { useState } from "react";

export default function CustomizationModal({ item, onConfirm, onCancel }) {
  const [spice, setSpice] = useState(item.customizations?.spice ? item.customizations.spice[1] || item.customizations.spice[0] : null);
  const [extras, setExtras] = useState([]);

  if (!item) return null;

  const toggleExtra = (extra) => {
    setExtras(prev => 
      prev.find(e => e.name === extra.name)
        ? prev.filter(e => e.name !== extra.name)
        : [...prev, extra]
    );
  };

  const handleConfirm = () => {
    onConfirm({ spice, extras });
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: "24px",
      }}
      onClick={onCancel}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "#FFFFFF",
          borderRadius: "24px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
          overflow: "hidden",
          animation: "slide-up 0.3s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: "24px", borderBottom: "1px solid #F0F0F0" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "24px", color: "#1E1E1E", marginBottom: "4px" }}>
            Customize {item.name}
          </h2>
          <p style={{ fontSize: "14px", color: "#666666", fontFamily: "'Outfit', sans-serif" }}>
            Tailor it to your preference
          </p>
        </div>

        {/* scrollable content */}
        <div style={{ maxHeight: "60vh", overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: "32px", scrollbarWidth: "none" }}>
          
          {/* Spice Level Section */}
          {item.customizations?.spice && (
            <section>
              <h3 style={{ fontSize: "14px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#91564E", marginBottom: "16px", fontFamily: "'Outfit', sans-serif" }}>
                Spice Level
              </h3>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {item.customizations.spice.map(level => (
                  <button
                    key={level}
                    onClick={() => setSpice(level)}
                    style={{
                      padding: "10px 20px",
                      borderRadius: "100px",
                      border: "1px solid",
                      borderColor: spice === level ? "#91564E" : "#EAEAEA",
                      background: spice === level ? "#91564E" : "#FFFFFF",
                      color: spice === level ? "#FFFFFF" : "#444444",
                      fontSize: "14px",
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: "all 150ms ease",
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Extras Section */}
          {item.customizations?.extras && (
            <section>
              <h3 style={{ fontSize: "14px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#91564E", marginBottom: "16px", fontFamily: "'Outfit', sans-serif" }}>
                Add Extras
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {item.customizations.extras.map(extra => {
                  const isActive = extras.find(e => e.name === extra.name);
                  return (
                    <button
                      key={extra.name}
                      onClick={() => toggleExtra(extra)}
                      style={{
                        padding: "16px",
                        borderRadius: "16px",
                        border: "1px solid",
                        borderColor: isActive ? "#91564E" : "#EAEAEA",
                        background: isActive ? "#FEF9F8" : "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        transition: "all 150ms ease",
                        textAlign: "left",
                        fontFamily: "'Outfit', sans-serif",
                      }}
                    >
                      <div>
                        <span style={{ fontSize: "16px", fontWeight: 500, color: "#1E1E1E" }}>{extra.name}</span>
                        {isActive && <span style={{ marginLeft: "8px", color: "#91564E" }}>✓</span>}
                      </div>
                      <span style={{ fontSize: "14px", color: "#666666" }}>+₹{extra.price}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* Action Footer */}
        <div style={{ padding: "24px", borderTop: "1px solid #F0F0F0", display: "flex", gap: "12px" }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              height: "56px",
              borderRadius: "16px",
              border: "1px solid #EAEAEA",
              background: "transparent",
              color: "#444444",
              fontSize: "16px",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            style={{
              flex: 2,
              height: "56px",
              borderRadius: "16px",
              border: "none",
              background: "#91564E",
              color: "#FFFFFF",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "transform 150ms ease",
              fontFamily: "'Outfit', sans-serif",
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Add to Order
          </button>
        </div>
      </div>
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
