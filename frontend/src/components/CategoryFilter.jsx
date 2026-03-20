export default function CategoryFilter({ categories, activeCategory, onSelect }) {
  return (
    /* Spec: Horizontal scrollable, 48-64px height, 16px spacing between categories */
    /* Spec: Positioned below header, 24px left/right margin */
    <div
      style={{
        display: "flex",
        gap: "16px",
        overflowX: "auto",
        scrollbarWidth: "none",
        minHeight: "48px",
        alignItems: "center",
      }}
    >
      {categories.map((cat) => {
        const isActive = cat.id === activeCategory;
        return (
          /* Spec: Button height 48px, radius 12px, Outfit 16px Medium, +1% letter spacing */
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            style={{
              height: "48px",
              padding: "0 24px",
              borderRadius: "12px",
              whiteSpace: "nowrap",
              flexShrink: 0,
              border: isActive ? "none" : "1px solid #EAEAEA",
              background: isActive ? "#91564E" : "transparent",
              color: isActive ? "#FFFFFF" : "#666666",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "16px",
              fontWeight: 500,
              letterSpacing: "0.01em",
              cursor: "pointer",
              transition: "all 150ms ease",
            }}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
