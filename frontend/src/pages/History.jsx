import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function History() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [history, setHistory] = useState([
    { id: "ORD-001", date: "Yesterday, 14:30", items: ["Classic Margherita", "Iced Latte"], total: 980, status: "completed" },
    { id: "ORD-002", date: "15 Mar, 19:15", items: ["Truffle Mushroom Pizza", "D&d Hot Dip"], total: 1020, status: "completed" },
    { id: "ORD-003", date: "12 Mar, 12:45", items: ["Vietnamese Coffee", "Almond Choco Cookie"], total: 410, status: "completed" },
    { id: "ORD-004", date: "10 Mar, 21:05", items: ["Selvatico Panuozzo"], total: 650, status: "completed" },
  ]);

  const spendingData = [65, 45, 85, 30, 95, 70, 50]; // Weekly mock data

  return (
    <div style={{
      minHeight: "100vh",
      background: "#111111",
      color: "#F5F0E8",
      fontFamily: "'Outfit', sans-serif",
      padding: "0 24px 64px",
    }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        
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
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 500 }}>Order History</h1>
            <p style={{ color: "#5A5248", fontSize: "14px" }}>Your personal journey at D&D Café.</p>
          </div>
        </header>

        {/* AI Spending Insights (The Visual Highlight) */}
        <section style={{ 
          background: "linear-gradient(135deg, #1C1C1C, #161616)", 
          borderRadius: "24px", padding: "28px", 
          border: "1px solid rgba(255,255,255,0.05)",
          marginBottom: "40px", position: "relative", overflow: "hidden"
        }}>
          <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "150px", height: "150px", background: "rgba(126,224,214,0.03)", borderRadius: "50%", filter: "blur(40px)" }} />
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px" }}>
            <div>
               <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#7EE0D6", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>Weekly Insights</h3>
               <p style={{ fontSize: "28px", fontWeight: 600 }}>₹3,060 <span style={{ fontSize: "14px", fontWeight: 400, color: "#5A5248" }}>spent this week</span></p>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "flex-end", height: "100px" }}>
              {spendingData.map((val, i) => (
                <div key={i} style={{ 
                  width: "24px", 
                  height: `${val}%`, 
                  background: i === 4 ? "#C8956C" : "rgba(255,255,255,0.05)",
                  borderRadius: "6px",
                  transition: "all 0.3s ease",
                  position: "relative"
                }}>
                   {i === 4 && <div style={{ position: "absolute", top: "-25px", left: "50%", transform: "translateX(-50%)", fontSize: "10px", fontWeight: 700, color: "#C8956C" }}>PEAK</div>}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: "24px" }}>
            <div style={{ flex: 1, padding: "16px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.02)" }}>
               <p style={{ fontSize: "12px", color: "#5A5248", marginBottom: "4px" }}>Most Ordered</p>
               <p style={{ fontSize: "15px", fontWeight: 600 }}>Classic Margherita</p>
            </div>
            <div style={{ flex: 1, padding: "16px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.02)" }}>
               <p style={{ fontSize: "12px", color: "#5A5248", marginBottom: "4px" }}>AI Suggestion</p>
               <p style={{ fontSize: "15px", fontWeight: 600, color: "#7EE0D6" }}>Truffle Fungi Pizza</p>
            </div>
          </div>
        </section>

        {/* Recent History List */}
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", marginBottom: "20px" }}>Recent Orders</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {history.map(order => (
            <div key={order.id} style={{
              background: "#161616",
              borderRadius: "20px",
              padding: "24px",
              border: "1px solid rgba(255,255,255,0.04)",
              transition: "transform 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.01)"; e.currentTarget.style.borderColor = "rgba(200,149,108,0.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div>
                  <p style={{ fontSize: "13px", color: "#5A5248", marginBottom: "4px" }}>{order.date}</p>
                  <p style={{ fontSize: "16px", fontWeight: 600 }}>{order.id}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "18px", fontWeight: 700, color: "#C8956C" }}>₹{order.total}</p>
                  <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#7EE0D6" }}>{order.status}</span>
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
                {order.items.map((item, idx) => (
                  <span key={idx} style={{ padding: "6px 12px", borderRadius: "100px", background: "rgba(255,255,255,0.03)", color: "#9A9080", fontSize: "12px" }}>
                    {item}
                  </span>
                ))}
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <button 
                  style={{ flex: 1, padding: "12px", borderRadius: "12px", border: "none", background: "rgba(200,149,108,0.1)", color: "#C8956C", fontWeight: 600, cursor: "pointer", fontSize: "13px" }}
                >
                  Download Receipt
                </button>
                <button 
                  style={{ flex: 1, padding: "12px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "none", color: "#9A9080", fontWeight: 600, cursor: "pointer", fontSize: "13px" }}
                >
                  Re-order All
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
