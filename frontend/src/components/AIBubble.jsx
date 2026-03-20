export default function AIBubble({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="animate-fade-in">
      <p
        className="text-base leading-relaxed text-center"
        style={{
          color: "var(--color-text-body)",
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        {message}
      </p>
    </div>
  );
}
