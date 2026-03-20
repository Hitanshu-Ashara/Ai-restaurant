import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPanel({ isOpen, onClose }) {
  const { items, removeItem, updateQty, getTotal } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50"
        style={{ background: "rgba(0,0,0,0.2)" }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="fixed top-0 right-0 h-full w-full max-w-md z-50 flex flex-col animate-slide-in-right"
        style={{ background: "var(--color-bg-primary)" }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingTop: "24px",
            paddingBottom: "16px",
            flexShrink: 0,
          }}
        >
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "24px",
              fontWeight: 400,
              color: "#1E1E1E",
            }}
          >
            Your Order
          </h2>
          <button
            onClick={onClose}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              border: "1px solid #EAEAEA",
              background: "#FFFFFF",
              color: "#1E1E1E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingTop: "16px",
            paddingBottom: "16px",
            scrollbarWidth: "none",
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: "8px",
              }}
            >
              <p style={{ fontSize: "16px", color: "#666666" }}>
                No items yet
              </p>
              <p style={{ fontSize: "14px", color: "#B2B2B2" }}>
                Add items from the menu
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px",
                    borderRadius: "16px",
                    background: "#FFFFFF",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#1E1E1E",
                        margin: 0,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.name}
                    </h3>
                    
                    {/* Display Customizations */}
                    {(item.customization?.spice || (item.customization?.extras && item.customization.extras.length > 0)) && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "4px" }}>
                        {item.customization.spice && (
                          <span style={{ fontSize: "10px", fontWeight: 600, color: "#91564E", background: "#FEF9F8", padding: "1px 6px", borderRadius: "4px", textTransform: "uppercase" }}>
                            {item.customization.spice}
                          </span>
                        )}
                        {item.customization.extras?.map(extra => (
                          <span key={extra.name} style={{ fontSize: "10px", fontWeight: 500, color: "#666666", background: "#F5F5F5", padding: "1px 6px", borderRadius: "4px" }}>
                            +{extra.name}
                          </span>
                        ))}
                      </div>
                    )}

                    <p
                      style={{
                        fontSize: "14px",
                        color: "#444444",
                        marginTop: "4px",
                      }}
                    >
                      ₹{(item.price + (item.customization?.extras?.reduce((s, e) => s + (e.price || 0), 0) || 0)) * item.quantity}
                    </p>
                  </div>

                  {/* Qty controls */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                    <button
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        border: "1px solid #EAEAEA",
                        color: "#444444",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      −
                    </button>
                    <span
                      style={{
                        width: "20px",
                        textAlign: "center",
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#1E1E1E",
                      }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        border: "none",
                        background: "#91564E",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            style={{
              paddingLeft: "24px",
              paddingRight: "24px",
              paddingTop: "16px",
              paddingBottom: "24px",
              borderTop: "1px solid #EAEAEA",
              flexShrink: 0,
              background: "#FFFFFF",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <div>
                <p style={{ fontSize: "12px", color: "#666666", marginBottom: "4px" }}>
                  {items.reduce((s, i) => s + i.quantity, 0)} items
                </p>
                <p style={{ fontSize: "18px", fontWeiht: 500, color: "#1E1E1E" }}>
                  ₹{getTotal()}
                </p>
              </div>
              <button
                onClick={() => { onClose(); navigate("/confirmation"); }}
                style={{
                  height: "48px",
                  padding: "0 24px",
                  borderRadius: "12px",
                  border: "none",
                  background: "#91564E",
                  color: "#FFFFFF",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  cursor: "pointer",
                  transition: "all 150ms ease",
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
