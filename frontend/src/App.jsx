import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import IdleScreen from "./pages/IdleScreen";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Confirmation from "./pages/Confirmation";

function App() {
  return (
    <CartProvider>
      <Router>
        <div
          className="min-h-screen"
          style={{
            background: "var(--color-bg-primary)",
            color: "var(--color-text-primary)",
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          <Routes>
            <Route path="/" element={<IdleScreen />} />
            <Route path="/home" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
