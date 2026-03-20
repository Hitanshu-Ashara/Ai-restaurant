import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function BottomActionBar({ onCartOpen }) {
  const { getTotal, getItemCount } = useCart();
  const navigate = useNavigate();
  const count = getItemCount();
  const total = getTotal();

  if (count === 0) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: "24px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "calc(100% - 48px)",
      maxWidth: "960px",
      background: "#C8956C",
      borderRadius: "16px",
      padding: "0 20px",
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 8px 32px rgba(200,149,108,0.35)",
      zIndex: 100,
      cursor: "pointer",
      animation: "fade-up 0.3s ease",
    }}
      onClick={() => navigate("/confirmation")}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{
          width: "28px", height: "28px",
          borderRadius: "8px",
          background: "rgba(0,0,0,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "13px", fontWeight: 700, color: "#fff",
        }}>
          {count}
        </div>
        <span style={{ fontSize: "15px", fontWeight: 600, color: "#fff" }}>View Order</span>
      </div>
      <span style={{ fontSize: "16px", fontWeight: 700, color: "#fff" }}>₹{total}</span>
    </div>
  );
}
