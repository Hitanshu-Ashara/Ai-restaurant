import { useCart } from "../context/CartContext";

export default function BottomActionBar({ onCartOpen }) {
  const { getTotal, getItemCount } = useCart();
  const total = getTotal();
  const count = getItemCount();

  if (count === 0) return null;

  return (
    /* Spec: 64px height, #FFFFFF, 1px solid #EAEAEA top border, no shadow */
    /* Spec: Left = Total Price (Outfit 16px Medium #1E1E1E), Right = subtle CTA */
    <div
      style={{
        height: "64px",
        background: "#FFFFFF",
        borderTop: "1px solid #EAEAEA",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: "24px",
        paddingRight: "24px",
        zIndex: 30,
      }}
    >
      <div>
        {/* Spec: Item count = 12px, #666666 */}
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "12px",
            fontWeight: 400,
            color: "#666666",
            lineHeight: "140%",
          }}
        >
          {count} {count === 1 ? "item" : "items"}
        </p>
        {/* Spec: Total = Outfit 16px Medium #1E1E1E */}
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "16px",
            fontWeight: 500,
            color: "#1E1E1E",
            lineHeight: "140%",
          }}
        >
          ₹{total}
        </p>
      </div>
      {/* Spec: Optional subtle CTA, small, not visually dominant */}
      <button
        onClick={onCartOpen}
        style={{
          height: "40px",
          padding: "0 24px",
          borderRadius: "12px",
          border: "1px solid #EAEAEA",
          background: "transparent",
          fontFamily: "'Outfit', sans-serif",
          fontSize: "16px",
          fontWeight: 500,
          color: "#91564E",
          letterSpacing: "0.01em",
          cursor: "pointer",
          transition: "all 150ms ease",
        }}
      >
        View
      </button>
    </div>
  );
}
