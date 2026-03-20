import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Confirmation() {
  const { items, getTotal, clearCart, updateQty } = useCart();
  const navigate = useNavigate();

  const handleConfirm = () => {
    clearCart();
    navigate("/");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#111111",
      fontFamily: "'Outfit', sans-serif",
      padding: "0 24px 48px",
    }}>
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ padding: "24px 0 20px", display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            onClick={() => navigate("/menu")}
            style={{
              width: "40px", height: "40px", borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.08)", background: "none",
              color: "#9A9080", fontSize: "18px", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            ←
          </button>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 500, color: "#F5F0E8" }}>
            Review Order
          </h1>
        </div>

        {/* Items */}
        <div style={{ background: "#1C1C1C", borderRadius: "16px", overflow: "hidden", marginBottom: "16px" }}>
          {items.length === 0 ? (
            <div style={{ padding: "48px", textAlign: "center", color: "#5A5248" }}>
              <div style={{ fontSize: "36px", marginBottom: "12px" }}>🛒</div>
              <p>Your cart is empty.</p>
              <button
                onClick={() => navigate("/menu")}
                style={{ marginTop: "16px", padding: "10px 24px", borderRadius: "10px", border: "1px solid rgba(200,149,108,0.3)", background: "none", color: "#C8956C", cursor: "pointer", fontSize: "14px" }}
              >
                Browse Menu
              </button>
            </div>
          ) : items.map((item, i) => (
            <div key={item.id} style={{
              display: "flex", alignItems: "center", gap: "14px",
              padding: "16px 20px",
              borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
            }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "14px", fontWeight: 500, color: "#F5F0E8", marginBottom: "4px" }}>{item.name}</p>
                <p style={{ fontSize: "13px", color: "#C8956C" }}>₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button onClick={() => updateQty(item.id, item.quantity - 1)} style={{ width: "28px", height: "28px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.1)", background: "none", color: "#9A9080", cursor: "pointer" }}>−</button>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#F5F0E8", minWidth: "20px", textAlign: "center" }}>{item.quantity}</span>
                <button onClick={() => updateQty(item.id, item.quantity + 1)} style={{ width: "28px", height: "28px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.1)", background: "none", color: "#9A9080", cursor: "pointer" }}>+</button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        {items.length > 0 && (
          <div style={{ background: "#1C1C1C", borderRadius: "16px", padding: "20px", marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "14px", color: "#9A9080" }}>Subtotal</span>
              <span style={{ fontSize: "14px", color: "#F5F0E8" }}>₹{getTotal()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <span style={{ fontSize: "16px", fontWeight: 600, color: "#F5F0E8" }}>Total</span>
              <span style={{ fontSize: "20px", fontWeight: 700, color: "#C8956C" }}>₹{getTotal()}</span>
            </div>
          </div>
        )}

        {/* CTA */}
        {items.length > 0 && (
          <button
            onClick={handleConfirm}
            style={{
              width: "100%", height: "56px", borderRadius: "14px",
              border: "none", background: "#C8956C",
              color: "#fff", fontSize: "16px", fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(200,149,108,0.3)",
              transition: "opacity 0.2s",
            }}
          >
            Place Order →
          </button>
        )}
      </div>
    </div>
  );
}
