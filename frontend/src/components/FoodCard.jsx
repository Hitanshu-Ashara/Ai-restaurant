import { useCart } from "../context/CartContext";
import { useState } from "react";

const CATEGORY_EMOJI = {
  pizza: "🍕", starters: "🥖", coffee: "☕", frappes: "🧋",
  matcha: "🍵", refreshers: "🍹", "hot-drinks": "🍫", "hot-coffee": "☕",
  "iced-tea": "🧊", desserts: "🍰", cookies: "🍪", dips: "🥣", salads: "🥗",
};

export default function FoodCard({ item, index = 0 }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addItem({ ...item, menuItemId: item.id, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const emoji = CATEGORY_EMOJI[item.category] || "🍽️";

  return (
    <div
      className="stagger-item"
      onClick={handleAdd}
      style={{
        background: "#1C1C1C",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.2s ease, box-shadow 0.3s ease",
        display: "flex",
        flexDirection: "column",
        animationDelay: `${index * 50}ms`, // Staggered entry
      }}
      onMouseEnter={e => { 
        e.currentTarget.style.transform = "translateY(-4px) scale(1.02)"; 
        e.currentTarget.style.borderColor = "rgba(200,149,108,0.4)";
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.5)";
      }}
      onMouseLeave={e => { 
        e.currentTarget.style.transform = "translateY(0) scale(1)"; 
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Image / Emoji area */}
      <div style={{
        height: "120px",
        background: "linear-gradient(135deg, #1E1A18, #2A2218)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "48px",
        position: "relative",
      }}>
        {emoji}
        {added && (
          <div style={{
            position: "absolute",
            inset: 0,
            background: "rgba(200,149,108,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            animation: "fade-up 0.3s ease",
          }}>
            ✓
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "14px 14px 16px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
        <p style={{
          fontSize: "14px",
          fontWeight: 500,
          color: "#F5F0E8",
          lineHeight: "1.4",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {item.name}
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
          <span style={{ fontSize: "15px", fontWeight: 600, color: "#C8956C" }}>
            ₹{item.price}
          </span>
          <button
            onClick={handleAdd}
            style={{
              width: "32px", height: "32px",
              borderRadius: "8px",
              border: "none",
              background: added ? "rgba(200,149,108,0.2)" : "rgba(200,149,108,0.1)",
              color: "#C8956C",
              fontSize: "18px",
              fontWeight: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
              lineHeight: 1,
            }}
          >
            {added ? "✓" : "+"}
          </button>
        </div>
      </div>
    </div>
  );
}
