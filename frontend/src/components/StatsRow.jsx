export default function StatsRow() {
  const stats = [
    { value: "24", label: "Active Requests" },
    { value: "₹48K+", label: "Disbursed" },
    { value: "100%", label: "AI-Moderated" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        marginTop: "-18px",        // 🔧 reduced overlap
        padding: "0 20px",
        position: "relative",
        zIndex: 30,                // 🔧 force above banner
      }}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          style={{
            background: "white",
            borderRadius: "18px",
            padding: "20px 12px",
            textAlign: "center",
            boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "800",
              color: "#22d3ee",
              marginBottom: "6px",
            }}
          >
            {stat.value}
          </div>

          <div
            style={{
              fontSize: "13px",
              color: "#6b7280",
              fontWeight: "500",
            }}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
