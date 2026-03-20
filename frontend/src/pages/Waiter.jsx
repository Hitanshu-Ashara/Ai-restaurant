import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function WaiterDashboard() {
  const { items, clearCart } = useCart();
  const [activeOrders, setActiveOrders] = useState([]);
  const [tableStatus, setTableStatus] = useState([
    { id: 1, status: "available", orders: 0 },
    { id: 2, status: "occupied", orders: 3 },
    { id: 3, status: "available", orders: 0 },
    { id: 4, status: "cleaning", orders: 0 },
    { id: 5, status: "occupied", orders: 1 },
    { id: 6, status: "available", orders: 0 },
  ]);
  const navigate = useNavigate();

  // Load orders into the waiter's view when placed
  useEffect(() => {
    if (items.length > 0) {
      // Simulate real-time order arrival
    }
  }, [items]);

  const updateTable = (id, newStatus) => {
    setTableStatus(tables => tables.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0A0A",
      color: "#F5F0E8",
      fontFamily: "'Outfit', sans-serif",
      display: "flex",
    }}>
      {/* Sidebar Navigation */}
      <aside style={{
        width: "240px",
        background: "#161616",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        display: "flex",
        flexDirection: "column",
        padding: "32px 24px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "48px" }}>
          <div style={{ padding: "8px", background: "#C8956C", borderRadius: "10px", fontSize: "16px" }}>☕</div>
          <span style={{ fontWeight: 700, fontSize: "18px", letterSpacing: "-1px" }}>D&D ADMIN</span>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ padding: "12px 16px", borderRadius: "8px", background: "rgba(200,149,108,0.1)", color: "#C8956C", fontWeight: 600 }}>🪑 Table Status</div>
          <div style={{ padding: "12px 16px", borderRadius: "8px", color: "#9A9080" }}>🧾 Active Orders</div>
          <div style={{ padding: "12px 16px", borderRadius: "8px", color: "#9A9080" }}>📊 Sales Reports</div>
          <div style={{ padding: "12px 16px", borderRadius: "8px", color: "#9A9080" }}>⚙️ Settings</div>
        </nav>

        <button 
          onClick={() => navigate("/menu")}
          style={{ marginTop: "auto", padding: "12px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "none", color: "#9A9080", cursor: "pointer" }}
        >
          Exit to Menu
        </button>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: "40px", overflowY: "auto" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 500 }}>Table Management</h1>
            <p style={{ color: "#5A5248", fontSize: "14px" }}>Monitor and manage live restaurant floor status.</p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
             <span style={{ padding: "8px 16px", background: "rgba(126,224,214,0.1)", color: "#7EE0D6", borderRadius: "100px", fontSize: "12px", fontWeight: 700 }}>LIVE SYNC ON</span>
          </div>
        </header>

        {/* Table Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px",
        }}>
          {tableStatus.map(table => (
            <div key={table.id} style={{
              background: "#161616",
              borderRadius: "20px",
              padding: "24px",
              border: "1px solid rgba(255,255,255,0.04)",
              transition: "all 0.3s ease",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <span style={{ fontSize: "20px", fontWeight: 700 }}>T-{table.id}</span>
                <span style={{ 
                  fontSize: "11px", 
                  fontWeight: 800, 
                  textTransform: "uppercase", 
                  color: table.status === "occupied" ? "#C8956C" : table.status === "cleaning" ? "#FFC857" : "#7EE0D6",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  background: "rgba(255,255,255,0.03)"
                }}>
                  {table.status}
                </span>
              </div>

              <div style={{ marginBottom: "24px" }}>
                 <p style={{ fontSize: "13px", color: "#5A5248", marginBottom: "4px" }}>Active Capacity</p>
                 <div style={{ height: "4px", background: "#333", borderRadius: "10px" }}>
                    <div style={{ width: table.status === "occupied" ? "75%" : "0%", height: "100%", background: "#C8956C", borderRadius: "10px" }} />
                 </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                {table.status === "available" ? (
                  <button 
                    onClick={() => updateTable(table.id, "occupied")}
                    style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "none", background: "#C8956C", color: "white", fontWeight: 600, cursor: "pointer" }}
                  >
                    Set Occupied
                  </button>
                ) : (
                  <button 
                    onClick={() => updateTable(table.id, "available")}
                    style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", background: "none", color: "#9A9080", cursor: "pointer" }}
                  >
                    Clear Table
                  </button>
                )}
                <button style={{ width: "42px", padding: "10px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", background: "none", color: "#9A9080" }}>👁️</button>
              </div>
            </div>
          ))}
        </div>

        {/* Live Order Feed */}
        <div style={{ marginTop: "64px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", marginBottom: "24px" }}>Real-time Orders</h2>
          <div style={{ background: "#161616", borderRadius: "20px", padding: "8px", border: "1px solid rgba(255,255,255,0.04)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
               <thead>
                 <tr style={{ textAlign: "left", color: "#5A5248", fontSize: "13px" }}>
                   <th style={{ padding: "16px 24px" }}>Order ID</th>
                   <th>Table</th>
                   <th>Items</th>
                   <th>Status</th>
                   <th>Total</th>
                   <th style={{ padding: "16px 24px", textAlign: "right" }}>Actions</th>
                 </tr>
               </thead>
               <tbody>
                  {[
                    { id: "#4021", table: "T-2", items: "Pizza, Latte", status: "preparing", total: "₹980" },
                    { id: "#4022", table: "T-5", items: "Tiramisu", status: "ready", total: "₹420" },
                    { id: "#4023", table: "T-4", items: "Vietnamese Coffee", status: "pending", total: "₹300" },
                  ].map(order => (
                    <tr key={order.id} style={{ borderTop: "1px solid rgba(255,255,255,0.03)", fontSize: "14px" }}>
                      <td style={{ padding: "20px 24px", fontWeight: 600 }}>{order.id}</td>
                      <td>{order.table}</td>
                      <td style={{ color: "#9A9080" }}>{order.items}</td>
                      <td>
                        <span style={{ 
                          padding: "4px 10px", 
                          borderRadius: "100px", 
                          fontSize: "11px", 
                          background: order.status === "ready" ? "rgba(126,224,214,0.1)" : "rgba(200,149,108,0.1)", 
                          color: order.status === "ready" ? "#7EE0D6" : "#C8956C" 
                        }}>
                          {order.status}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600 }}>{order.total}</td>
                      <td style={{ padding: "20px 24px", textAlign: "right" }}>
                        <button style={{ background: "none", border: "none", color: "#C8956C", cursor: "pointer", fontWeight: 600 }}>Manage Order →</button>
                      </td>
                    </tr>
                  ))}
               </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
