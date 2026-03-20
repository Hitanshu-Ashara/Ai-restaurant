export default function CategoryFilter({ categories, activeCategory, onSelect }) {
  return (
    <div style={{
      display: "flex",
      gap: "8px",
      overflowX: "auto",
      scrollbarWidth: "none",
      paddingBottom: "4px",
    }}>
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            style={{
              flexShrink: 0,
              padding: "8px 18px",
              borderRadius: "100px",
              border: isActive ? "1px solid rgba(200,149,108,0.6)" : "1px solid rgba(255,255,255,0.07)",
              background: isActive ? "rgba(200,149,108,0.15)" : "rgba(255,255,255,0.03)",
              color: isActive ? "#C8956C" : "#9A9080",
              fontSize: "13px",
              fontWeight: isActive ? 600 : 400,
              cursor: "pointer",
              transition: "all 0.2s ease",
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
            }}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
