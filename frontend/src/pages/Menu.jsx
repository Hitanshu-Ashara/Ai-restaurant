import { useState, useEffect, useRef } from "react";
import { menu, categories } from "../data/menu";
import FoodCard from "../components/FoodCard";
import CategoryFilter from "../components/CategoryFilter";
import CartPanel from "../components/CartPanel";
import BottomActionBar from "../components/BottomActionBar";
import MicButton from "../components/MicButton";
import { useCart } from "../context/CartContext";
import { speak } from "../utils/speech";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning! Welcome to D&D Café. Ready for some breakfast?";
    if (hour < 17) return "Good afternoon! Ready for a premium lunch or coffee?";
    return "Good evening! Welcome to D&D Café. What can I get for you?";
  });
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const { items, getItemCount } = useCart();
  const silenceTimer = useRef(null);

  // Proactive Re-engagement Logic
  useEffect(() => {
    // Clear existing timer whenever state changes
    if (silenceTimer.current) clearTimeout(silenceTimer.current);

    // Only nudge if there are items and we aren't already listening
    if (items.length > 0 && !isListening && !isCartOpen) {
      silenceTimer.current = setTimeout(() => {
        const msg = "I've saved your order so far. Shall I confirm it for you, or would you like to add something else?";
        setAiMessage(msg);
        speak(msg);
      }, 10000); // 10 seconds of silence
    }

    return () => {
      if (silenceTimer.current) clearTimeout(silenceTimer.current);
    };
  }, [items, isListening, isCartOpen]);

  const filteredMenu = activeCategory === "all" ? menu : menu.filter(i => i.category === activeCategory);

  return (
    <div style={{
      height: "100vh",
      background: "#111111",
      fontFamily: "'Outfit', sans-serif",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>
      <div style={{
        maxWidth: "1100px",
        width: "100%",
        margin: "0 auto",
        padding: "0 24px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}>

        {/* ── HEADER ── */}
        <header style={{ padding: "20px 0 16px", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>

            {/* Left: AI message */}
            <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
              {/* Subtle AI Glow */}
              <div className="breathing-glow" style={{ top: "-20px", left: "-20px", background: isListening ? "var(--ai-teal)" : "var(--accent)" }} />
              
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "28px", fontWeight: 500,
                color: "#F5F0E8", marginBottom: "6px",
                letterSpacing: "-0.01em",
                zIndex: 1,
              }}>
                D&D Café
              </h1>
              <p style={{ fontSize: "14px", color: "#9A9080", lineHeight: "1.5", zIndex: 1 }}>
                {isListening ? (
                  <span style={{ color: "#7EE0D6", fontWeight: 500 }}>AI is listening…</span>
                ) : transcript ? (
                  <><span style={{ color: "#5A5248" }}>You said: "</span><span style={{ color: "#F5F0E8" }}>{transcript}</span><span style={{ color: "#5A5248" }}>"</span></>
                ) : (
                  aiMessage
                )}
              </p>
            </div>

            {/* Right: Mic + Cart */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
              <MicButton
                isListening={isListening}
                setIsListening={setIsListening}
                onTranscript={setTranscript}
                onAiResponse={(res) => { if (res?.message) setAiMessage(res.message); }}
                size="large"
              />
              <button
                onClick={() => setIsCartOpen(true)}
                style={{
                  position: "relative",
                  width: "48px", height: "48px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#9A9080",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {getItemCount() > 0 && (
                  <span style={{
                    position: "absolute", top: "-6px", right: "-6px",
                    width: "18px", height: "18px", borderRadius: "50%",
                    background: "#C8956C", color: "#fff",
                    fontSize: "10px", fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {getItemCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* ── CATEGORIES ── */}
        <div style={{ flexShrink: 0, marginBottom: "20px" }}>
          <CategoryFilter categories={categories} activeCategory={activeCategory} onSelect={setActiveCategory} />
        </div>

        {/* ── MENU GRID ── */}
        <main style={{ flex: 1, overflowY: "auto", paddingBottom: "100px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "16px",
          }}>
            {filteredMenu.map((item, index) => <FoodCard key={item.id} item={item} index={index} />)}
          </div>
          {filteredMenu.length === 0 && (
            <div style={{ textAlign: "center", padding: "64px 0", color: "#5A5248" }}>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>🤷</div>
              <p>No items in this category</p>
            </div>
          )}
        </main>
      </div>

      {/* ── FLOATING CART BAR ── */}
      <BottomActionBar onCartOpen={() => setIsCartOpen(true)} />

      {/* ── CART PANEL ── */}
      <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
