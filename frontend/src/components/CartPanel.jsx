import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPanel({ isOpen, onClose }) {
  const { items, removeItem, updateQty, getTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
        zIndex: 200,
      }} />

      {/* Panel */}
      <div style={{
        position: "fixed", top: 0, right: 0,
        width: "380px", height: "100vh",
        background: "#1C1C1C",
        borderLeft: "1px solid rgba(255,255,255,0.07)",
        zIndex: 201,
        display: "flex", flexDirection: "column",
        animation: "fade-up 0.25s ease",
      }}>
        {/* Header */}
        <div style={{ padding: "24px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#F5F0E8" }}>Your Order</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#9A9080", fontSize: "22px", cursor: "pointer", lineHeight: 1 }}>✕</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 0", color: "#5A5248" }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>🛒</div>
              <p>Your cart is empty</p>
            </div>
          ) : items.map(item => (
            <div key={item.id} style={{
              display: "flex", alignItems: "center", gap: "12px",
              padding: "14px 0",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "14px", fontWeight: 500, color: "#F5F0E8", marginBottom: "4px" }}>{item.name}</p>
                <p style={{ fontSize: "13px", color: "#C8956C" }}>₹{item.price}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button onClick={() => updateQty(item.id, item.quantity - 1)} style={{ width: "28px", height: "28px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "none", color: "#9A9080", fontSize: "16px", cursor: "pointer" }}>−</button>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#F5F0E8", minWidth: "20px", textAlign: "center" }}>{item.quantity}</span>
                <button onClick={() => updateQty(item.id, item.quantity + 1)} style={{ width: "28px", height: "28px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "none", color: "#9A9080", fontSize: "16px", cursor: "pointer" }}>+</button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: "20px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
              <span style={{ fontSize: "15px", color: "#9A9080" }}>Total</span>
              <span style={{ fontSize: "18px", fontWeight: 700, color: "#C8956C" }}>₹{getTotal()}</span>
            </div>
            <button
              onClick={() => { onClose(); navigate("/confirmation"); }}
              style={{
                width: "100%", height: "52px", borderRadius: "12px",
                border: "none", background: "#C8956C",
                color: "#fff", fontSize: "15px", fontWeight: 600,
                cursor: "pointer", transition: "opacity 0.2s",
              }}
            >
              Confirm Order →
            </button>
            <button
              onClick={clearCart}
              style={{ width: "100%", marginTop: "10px", padding: "10px", background: "none", border: "none", color: "#5A5248", fontSize: "13px", cursor: "pointer" }}
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
