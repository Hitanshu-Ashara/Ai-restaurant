import { useState } from "react";
import { startListening, speak } from "../utils/speech";
import { sendMessage } from "../utils/api";
import { useCart } from "../context/CartContext";

export default function MicButton({ isListening, setIsListening, onTranscript, onAiResponse, size = "large" }) {
  const { addItem } = useCart();
  const [isPending, setIsPending] = useState(false);

  const handleMicClick = async () => {
    if (isListening || isPending) return;
    setIsListening(true);
    setIsPending(true);

    try {
      const transcript = await startListening();
      if (onTranscript && transcript) onTranscript(transcript);

      if (transcript) {
        const response = await sendMessage(transcript, []);
        if (response?.action === "add" && response?.item) addItem({ ...response.item, menuItemId: response.item.id, quantity: 1 });
        if (response?.message) { speak(response.message); }
        if (onAiResponse) onAiResponse(response);
      } else {
        if (onAiResponse) onAiResponse({ message: "I didn't catch that. Please try again.", action: "none" });
      }
    } catch {
      if (onAiResponse) onAiResponse({ message: "Mic error. Please allow access.", action: "none" });
    } finally {
      setIsListening(false);
      setIsPending(false);
    }
  };

  const isActive = isListening || isPending;
  const sz = size === "large" ? 56 : 40;
  const iconSz = size === "large" ? 22 : 16;

  return (
    <button
      onClick={handleMicClick}
      title={isActive ? "Listening..." : "Tap to order by voice"}
      style={{
        width: `${sz}px`, height: `${sz}px`,
        borderRadius: "50%",
        border: isActive ? "none" : "1px solid rgba(126,224,214,0.3)",
        background: isActive ? "rgba(126,224,214,0.15)" : "rgba(126,224,214,0.06)",
        color: "#7EE0D6",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: isActive ? "not-allowed" : "pointer",
        transition: "all 0.2s ease",
        animation: isActive ? "pulse-ring 1.4s infinite" : "none",
        flexShrink: 0,
      }}
    >
      <svg width={iconSz} height={iconSz} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </svg>
    </button>
  );
}
