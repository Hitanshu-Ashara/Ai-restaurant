import { useState } from "react";
import { menu, categories } from "../data/menu";
import FoodCard from "../components/FoodCard";
import CategoryFilter from "../components/CategoryFilter";
import CartPanel from "../components/CartPanel";
import BottomActionBar from "../components/BottomActionBar";
import MicButton from "../components/MicButton";
import { useCart } from "../context/CartContext";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState("What would you like to order today?");
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const { getItemCount } = useCart();

  const filteredMenu =
    activeCategory === "all"
      ? menu
      : menu.filter((item) => item.category === activeCategory);

  return (
    <div
      style={{
        height: "100vh",
        overflow: "hidden",
        background: "#FFF8E3",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* Centered container with 24px padding on sides as per spec */}
      <div
        style={{
          maxWidth: "1024px",
          margin: "0 auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >

        {/* ═══ HEADER ═══ */}
        <header
          style={{
            paddingTop: "24px",
            paddingBottom: "0",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            {/* Left — Greeting */}
            <div style={{ flex: 1, paddingRight: "24px" }}>
              <h1
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "32px",
                  fontWeight: 400,
                  lineHeight: "120%",
                  color: "#1E1E1E",
                  letterSpacing: "-0.01em",
                  marginBottom: "8px",
                }}
              >
                D&D Café
              </h1>

              {aiMessage && (
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "150%",
                    color: "#444444",
                  }}
                >
                  {aiMessage}
                </p>
              )}

              {transcript && (
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "150%",
                    color: "#1E1E1E",
                    marginTop: "8px",
                  }}
                >
                  "{transcript}"
                </p>
              )}
            </div>

            {/* Right — Mic + Cart */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                flexShrink: 0,
              }}
            >
              <MicButton
                isListening={isListening}
                setIsListening={setIsListening}
                onTranscript={(text) => setTranscript(text)}
                onAiResponse={(res) => {
                  if (res?.message) setAiMessage(res.message);
                }}
                size="large"
              />
              <button
                onClick={() => setIsCartOpen(true)}
                style={{
                  position: "relative",
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  border: "1px solid #EAEAEA",
                  background: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#1E1E1E",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                  <path d="M3 6h18"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                {getItemCount() > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-6px",
                      right: "-6px",
                      width: "20px",
                      height: "20px",
                      borderRadius: "9999px",
                      background: "#91564E",
                      color: "#FFFFFF",
                      fontSize: "11px",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {getItemCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* ═══ CATEGORY NAV ═══ */}
        {/* Spec: Header → Categories: 24px */}
        <div
          style={{
            flexShrink: 0,
            marginTop: "24px",
          }}
        >
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        </div>

        {/* ═══ MENU GRID ═══ */}
        {/* Spec: Categories → Grid: 24px */}
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            marginTop: "24px",
            paddingBottom: "32px", /* Spec: Grid → Bottom Cart: 32px */
            scrollbarWidth: "none",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
          >
            {filteredMenu.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>

          {filteredMenu.length === 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "64px 0",
              }}
            >
              <p style={{ fontSize: "16px", color: "#666666" }}>
                No items in this category
              </p>
            </div>
          )}

          {/* Bottom padding spacer to prevent content cut by fixed bottom bar */}
          <div style={{ height: "64px" }} />
        </main>

        {/* ═══ BOTTOM CART BAR ═══ */}
        <div style={{ position: "sticky", bottom: 0, left: 0, width: "100%", background: "#FFFFFF", zIndex: 40 }}>
          <BottomActionBar onCartOpen={() => setIsCartOpen(true)} />
        </div>

        {/* Cart Panel */}
        <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </div>
  );
}
