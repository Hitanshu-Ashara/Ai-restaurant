import { useNavigate } from "react-router-dom";

export default function IdleScreen() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center h-screen cursor-pointer select-none"
      style={{ background: "var(--color-bg-primary)" }}
      onClick={() => navigate("/menu")}
    >
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        {/* Greeting */}
        <h2
          className="text-2xl"
          style={{ fontFamily: "'Instrument Serif', serif", color: "var(--color-text-primary)" }}
        >
          Welcome to D&D Café
        </h2>

        {/* Main prompt */}
        <h1
          className="text-4xl text-center leading-tight"
          style={{ fontFamily: "'Instrument Serif', serif", color: "var(--color-text-primary)" }}
        >
          What would you like<br />to order?
        </h1>

        {/* Mic icon */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mt-6 animate-soft-pulse"
          style={{ color: "var(--color-accent)" }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" x2="12" y1="19" y2="22"/>
          </svg>
        </div>

        {/* Hint */}
        <p
          className="text-sm animate-breathing"
          style={{ color: "var(--color-text-label)" }}
        >
          Tap anywhere to start
        </p>
      </div>

      {/* Bottom hint */}
      <p
        className="absolute bottom-6 text-xs"
        style={{ color: "var(--color-text-label)" }}
      >
        Voice assistant is always active for faster ordering
      </p>
    </div>
  );
}
