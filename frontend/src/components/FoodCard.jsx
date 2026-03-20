import { useCart } from "../context/CartContext";
import { useState } from "react";
import CustomizationModal from "./CustomizationModal";

const categoryImages = {
  pizza: "/images/pizza.png",
  starters: "/images/starters.png",
  coffee: "/images/coffee.png",
  frappes: "/images/coffee.png",
  matcha: "/images/matcha.png",
  refreshers: "/images/matcha.png",
  "hot-drinks": "/images/coffee.png",
  "hot-coffee": "/images/coffee.png",
  "iced-tea": "/images/matcha.png",
  desserts: "/images/desserts.png",
  cookies: "/images/desserts.png",
  dips: "/images/starters.png",
  salads: "/images/starters.png",
};

export default function FoodCard({ item }) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);

  const handleAdd = (e) => {
    e?.stopPropagation();
    if (item.customizations) {
      setShowCustomizer(true);
    } else {
      confirmAdd({});
    }
  };

  const confirmAdd = (customization) => {
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      customization,
    });
    setIsAdded(true);
    setShowCustomizer(false);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const imageSrc = categoryImages[item.category] || "/images/pizza.png";

  return (
    <>
      {/* Spec: Card = #FFFFFF, 16px border-radius, shadow Y:4px Blur:12px */}
      <div
        onClick={handleAdd}
        style={{
          background: "#FFFFFF",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
          cursor: "pointer",
          transition: "transform 150ms ease",
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {/* Spec: Image top, 140-160px height, full width, cover fit, top corners rounded */}
        <div
          style={{
            width: "100%",
            height: "160px",
            overflow: "hidden",
          }}
        >
          <img
            src={imageSrc}
            alt={item.name}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* Spec: Content padding 16px */}
        <div style={{ padding: "16px" }}>
          {/* Spec: Name = Outfit, 16px, Medium, #1E1E1E, max 2 lines */}
          <h3
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "140%",
              color: "#1E1E1E",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              marginBottom: "8px", /* Spec: Name → Price: 8px */
            }}
          >
            {item.name}
          </h3>

          {/* Spec: Price = Outfit, 14px, Regular, #444444 */}
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "140%",
              color: "#444444",
              marginBottom: "16px", /* Spec: Price → Button: 16px */
            }}
          >
            ₹{item.price}
          </p>

          {/* Spec: Add Button = Primary button, height 40px, full width, 12px radius */}
          {/* Spec: Font = Outfit, 16px, Medium, +1% letter spacing */}
          <button
            onClick={handleAdd}
            style={{
              width: "100%",
              height: "40px",
              borderRadius: "12px",
              border: "none",
              background: isAdded ? "#F6F6F6" : "#91564E",
              color: isAdded ? "#444444" : "#FFFFFF",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "16px",
              fontWeight: 500,
              letterSpacing: "0.01em",
              cursor: "pointer",
              transition: "all 150ms ease",
            }}
          >
            {isAdded ? "Added ✓" : "Add"}
          </button>
        </div>
      </div>

      {showCustomizer && (
        <CustomizationModal
          item={item}
          onConfirm={confirmAdd}
          onCancel={() => setShowCustomizer(false)}
        />
      )}
    </>
  );
}
