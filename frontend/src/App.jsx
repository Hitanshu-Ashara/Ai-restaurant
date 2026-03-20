import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { useState } from "react";
import IdleScreen from "./pages/IdleScreen";
import Menu from "./pages/Menu";
import Confirmation from "./pages/Confirmation";
import Waiter from "./pages/Waiter";
import History from "./pages/History";

function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  if (location.pathname === "/" || location.pathname === "/confirmation") return null;

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          top: "24px", left: "24px",
          width: "48px", height: "48px",
          borderRadius: "14px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "#F5F0E8",
          fontSize: "20px",
          zIndex: 1000,
          cursor: "pointer",
          backdropFilter: "blur(12px)",
        }}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {isOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0,
          width: "280px", height: "100vh",
          background: "#161616",
          borderRight: "1px solid rgba(255,255,255,0.05)",
          padding: "96px 32px",
          zIndex: 999,
          display: "flex", flexDirection: "column", gap: "16px",
          animation: "fade-up 0.3s ease",
          boxShadow: "20px 0 60px rgba(0,0,0,0.5)",
        }}>
          <Link to="/menu" onClick={() => setIsOpen(false)} style={{ textDecoration: "none", padding: "12px 16px", borderRadius: "10px", background: location.pathname === "/menu" ? "#C8956C" : "transparent", color: location.pathname === "/menu" ? "#fff" : "#9A9080", fontWeight: 600 }}>🍽️ Digital Menu</Link>
          <Link to="/history" onClick={() => setIsOpen(false)} style={{ textDecoration: "none", padding: "12px 16px", borderRadius: "10px", background: location.pathname === "/history" ? "#C8956C" : "transparent", color: location.pathname === "/history" ? "#fff" : "#9A9080", fontWeight: 600 }}>🧾 Order History</Link>
          <Link to="/waiter" onClick={() => setIsOpen(false)} style={{ textDecoration: "none", padding: "12px 16px", borderRadius: "10px", background: location.pathname === "/waiter" ? "#C8956C" : "transparent", color: location.pathname === "/waiter" ? "#fff" : "#9A9080", fontWeight: 600 }}>🪑 Waiter Dashboard</Link>
          <Link to="/" onClick={() => setIsOpen(false)} style={{ textDecoration: "none", padding: "12px 16px", borderRadius: "10px", marginTop: "auto", color: "#5A5248", fontSize: "14px" }}>← Back to Start</Link>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <div style={{ minHeight: "100vh", background: "#111111", color: "#F5F0E8", fontFamily: "'Outfit', sans-serif" }}>
          <Navigation />
          <Routes>
            <Route path="/" element={<IdleScreen />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/waiter" element={<Waiter />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
