import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Kitchen() {
  const [orders, setOrders] = useState([
    { id: "4021", table: "T-2", items: [{ name: "Classic Margherita", qty: 1, note: "Spicy" }, { name: "Iced Latte", qty: 1 }], time: "5m ago", status: "preparing" },
    { id: "4022", table: "T-5", items: [{ name: "Grandmama's Tiramisu", qty: 1 }], time: "2m ago", status: "pending" },
  ]);

  const completeOrder = (id) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080808",
      color: "#F5F0E8",
      padding: "32px",
      fontFamily: "'Outfit', sans-serif",
    }}>
      {/* KDS Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", fontWeight: 500, color: "#C8956C" }}>Kitchen Display</h1>
          <p style={{ color: "#5A5248", fontSize: "14px" }}>Order relay system for active kitchen staff.</p>
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
           <div style={{ padding: "12px 24px", background: "rgba(126,224,214,0.1)", color: "#7EE0D6", borderRadius: "12px", border: "1px solid rgba(126,224,214,0.2)" }}>
              <span style={{ fontSize: "12px", fontWeight: 700 }}>SYSTEM STATUS: ACTIVE</span>
           </div>
        </div>
      </header>

      {/* Order Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "24px",
      }}>
        {orders.map(order => (
          <div key={order.id} style={{
            background: "#161616",
            borderRadius: "24px",
            border: "1px solid rgba(255,255,255,0.05)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              <div>
                 <span style={{ fontSize: "24px", fontWeight: 700, color: "#C8956C" }}>{order.table}</span>
                 <p style={{ color: "#5A5248", fontSize: "12px" }}>ID: {order.id} • {order.time}</p>
              </div>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                 🍳
              </div>
            </div>

            <div style={{ flex: 1, padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              {order.items.map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                   <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "16px", fontWeight: 600 }}>{item.qty}× {item.name}</p>
                      {item.note && <p style={{ fontSize: "12px", color: "#7EE0D6", fontStyle: "italic" }}>Note: {item.note}</p>}
                   </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => completeOrder(order.id)}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "14px",
                border: "none",
                background: "rgba(126,224,214,0.1)",
                color: "#7EE0D6",
                fontWeight: 700,
                cursor: "pointer",
                marginTop: "16px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#7EE0D6"; e.currentTarget.style.color = "#000"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(126,224,214,0.1)"; e.currentTarget.style.color = "#7EE0D6"; }}
            >
              Mark Done ✓
            </button>
          </div>
        ))}

        {orders.length === 0 && (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "128px 0" }}>
             <p style={{ color: "#5A5248", fontSize: "20px" }}>No active orders. Kitchen is clear!</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes flash {
          0% { border-color: rgba(200,149,108,0.05); }
          50% { border-color: #C8956C; }
          100% { border-color: rgba(200,149,108,0.05); }
        }
        .new-order { animation: flash 1s infinite; }
      `}</style>
    </div>
  );
}
