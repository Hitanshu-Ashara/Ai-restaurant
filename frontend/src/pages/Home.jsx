import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MicButton from "../components/MicButton";
import AIBubble from "../components/AIBubble";

export default function Home() {
  const navigate = useNavigate();
  const [aiMessage, setAiMessage] = useState("What would you like to order?");
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  // Auto-navigate to menu when AI processes a browse intent
  useEffect(() => {
    // After some interaction, user may want to see menu
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen relative"
      style={{ background: "var(--color-bg-primary)" }}
    >
      {/* Top greeting */}
      <div className="absolute top-6 left-6 animate-fade-in">
        <h2
          className="text-2xl"
          style={{ fontFamily: "'Instrument Serif', serif", color: "var(--color-text-primary)" }}
        >
          Welcome to D&D Café
        </h2>
      </div>

      {/* Center content */}
      <div className="flex flex-col items-center gap-6 max-w-md w-full px-6">
        {/* Main heading */}
        <h1
          className="text-4xl text-center leading-tight animate-fade-in"
          style={{ fontFamily: "'Instrument Serif', serif", color: "var(--color-text-primary)" }}
        >
          What would you like<br />to order?
        </h1>

        {/* AI response text */}
        <AIBubble message={aiMessage} />

        {/* Transcript */}
        {transcript && (
          <p
            className="text-base text-center animate-fade-in"
            style={{ color: "var(--color-text-primary)" }}
          >
            "{transcript}"
          </p>
        )}

        {/* Mic button */}
        <div className="mt-4">
          <MicButton
            isListening={isListening}
            setIsListening={setIsListening}
            onTranscript={(text) => setTranscript(text)}
            onAiResponse={(res) => {
              if (res?.response) setAiMessage(res.response);
              // If AI says browse, go to menu
              if (res?.intent === "browse") navigate("/menu");
            }}
          />
        </div>

        {/* Hint */}
        <p
          className="text-sm"
          style={{ color: "var(--color-text-label)" }}
        >
          You can speak or tap to start
        </p>

        {/* Browse menu button (subtle, secondary) */}
        <button
          onClick={() => navigate("/menu")}
          className="text-sm transition-all duration-200 mt-4"
          style={{
            color: "var(--color-text-label)",
            textDecoration: "underline",
            textUnderlineOffset: "4px",
          }}
        >
          or browse the menu
        </button>
      </div>

      {/* Bottom */}
      <p
        className="absolute bottom-6 text-xs"
        style={{ color: "var(--color-text-label)" }}
      >
        Voice assistant is always active for faster ordering
      </p>
    </div>
  );
}
