import { startListening } from "../utils/speech";
import { sendMessage } from "../utils/api";
import { useCart } from "../context/CartContext";

export default function MicButton({
  isListening,
  setIsListening,
  onTranscript,
  onAiResponse,
  size = "large",
}) {
  const { items } = useCart();

  const handleMicClick = async () => {
    if (isListening) return;
    setIsListening(true);
    try {
      const transcript = await startListening();
      if (onTranscript) onTranscript(transcript);
      if (transcript) {
        try {
          const response = await sendMessage(transcript, items);
          if (onAiResponse) onAiResponse(response);
        } catch {
          // Backend not available
        }
      }
    } catch (err) {
      console.error("Speech error:", err);
    } finally {
      setIsListening(false);
    }
  };

  const isSmall = size === "small";

  return (
    <button
      onClick={handleMicClick}
      className={`rounded-full flex items-center justify-center transition-all duration-200 ${
        isListening ? "animate-soft-pulse" : ""
      }`}
      style={{
        width: isSmall ? "40px" : "64px",
        height: isSmall ? "40px" : "64px",
        color: isListening ? "#FFFFFF" : "var(--color-accent)",
        background: isListening ? "var(--color-accent)" : "transparent",
        border: isListening ? "none" : "1px solid var(--color-border-light)",
      }}
    >
      <svg
        width={isSmall ? "16" : "24"}
        height={isSmall ? "16" : "24"}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </svg>
    </button>
  );
}
