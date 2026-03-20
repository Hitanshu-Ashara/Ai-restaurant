import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { speak } from "../utils/speech";
import { useState } from "react";

export default function Confirmation() {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCart();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [orderId] = useState(() => `ORD-${Date.now().toString(36).toUpperCase()}`);

  const handleConfirm = () => {
    setIsConfirmed(true);
    speak("Your order has been placed. Thank you for dining with us.");
    setTimeout(() => clearCart(), 3000);
  };

  if (isConfirmed) {
    return (
      <div
        style={{
          height: "100vh",
          background: "#FFF8E3",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: "24px",
          paddingRight: "24px",
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        <div style={{ maxWidth: "480px", width: "100%", textAlign: "center", animation: "fade-in 0.5s ease-out" }}>
          <h1
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "40px",
              fontWeight: 400,
              color: "#1E1E1E",
              marginBottom: "16px",
            }}
          >
            Order Placed
          </h1>
          <p style={{ fontSize: "18px", color: "#444444", marginBottom: "32px" }}>
            Your order is being prepared.<br />We'll notify you when it's ready.
          </p>
          <div
            style={{
              padding: "12px 24px",
              borderRadius: "12px",
              background: "#FFFFFF",
              border: "1px solid #EAEAEA",
              display: "inline-block",
              marginBottom: "40px",
            }}
          >
            <p style={{ fontSize: "12px", color: "#666666", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Order ID
            </p>
            <p style={{ fontSize: "16px", fontWeight: 500, color: "#1E1E1E", fontFamily: "monospace" }}>
              {orderId}
            </p>
          </div>
          <div>
            <button
              onClick={() => navigate("/")}
              style={{
                height: "48px",
                padding: "0 40px",
                borderRadius: "12px",
                border: "none",
                background: "#91564E",
                color: "#FFFFFF",
                fontSize: "16px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 150ms ease",
              }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100vh",
        background: "#FFF8E3",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1024px",
          margin: "0 auto",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >
        {/* Header */}
        <header
          style={{
            paddingTop: "24px",
            paddingBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => navigate("/menu")}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              border: "1px solid #EAEAEA",
              background: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <span style={{ color: "#1E1E1E", fontSize: "18px" }}>←</span>
          </button>
          <h1
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "24px",
              fontWeight: 400,
              color: "#1E1E1E",
            }}
          >
            Review Order
          </h1>
        </header>

        {/* Items */}
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            marginTop: "16px",
            paddingBottom: "32px",
            scrollbarWidth: "none",
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <p style={{ color: "#666666" }}>Your cart is empty</p>
              <button
                onClick={() => navigate("/menu")}
                style={{
                  marginTop: "16px",
                  fontSize: "14px",
                  textDecoration: "underline",
                  color: "#91564E",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px",
                    borderRadius: "16px",
                    background: "#FFFFFF",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        color: "#1E1E1E",
                        marginBottom: "4px",
                      }}
                    >
                      {item.name}
                    </h3>
                    {/* Display Customizations */}
                    {(item.customization?.spice || (item.customization?.extras && item.customization.extras.length > 0)) && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {item.customization.spice && (
                          <span style={{ fontSize: "12px", color: "#91564E", fontWeight: 500 }}>
                            {item.customization.spice}
                          </span>
                        )}
                        {item.customization.extras?.map(extra => (
                          <span key={extra.name} style={{ fontSize: "12px", color: "#666666" }}>
                            +{extra.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
                    <span style={{ fontSize: "14px", color: "#666666" }}>
                      ×{item.quantity}
                    </span>
                    <span style={{ fontWeight: 500, color: "#1E1E1E" }}>
                      ₹{(item.price + (item.customization?.extras?.reduce((s, e) => s + (e.price || 0), 0) || 0)) * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Footer */}
        {items.length > 0 && (
          <div
            style={{
              paddingTop: "16px",
              paddingBottom: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              background: "#FFF8E3",
              borderTop: "1px solid #EAEAEA",
            }}
          >
            <div>
              <p style={{ fontSize: "12px", color: "#666666", marginBottom: "4px" }}>
                {items.reduce((s, i) => s + i.quantity, 0)} items
              </p>
              <p style={{ fontSize: "18px", fontWeight: 500, color: "#1E1E1E" }}>
                ₹{getTotal()}
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => navigate("/menu")}
                style={{
                  height: "48px",
                  padding: "0 24px",
                  borderRadius: "12px",
                  border: "1px solid #EAEAEA",
                  color: "#444444",
                  background: "transparent",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={handleConfirm}
                style={{
                  height: "48px",
                  padding: "0 24px",
                  borderRadius: "12px",
                  border: "none",
                  background: "#91564E",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  cursor: "pointer",
                  transition: "all 150ms ease",
                }}
              >
                Confirm Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
