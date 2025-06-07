import React from "react";

interface MetricsDisplayProps {
  data: Record<string, number>;
}

const MetricsDisplay: React.FC<MetricsDisplayProps> = ({ data }) => {
  const rows = Object.entries(data).map(([metric, value]) => ({
    metric,
    value,
  }));

  return (
    <div>
      <h3>Code Quality Metrics</h3>
      <table
        className="metrics-table"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "16px",
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
        <th
          style={{
            padding: "12px 16px",
            borderBottom: "2px solid #e0e0e0",
            textAlign: "left",
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          Metric
        </th>
        <th
          style={{
            padding: "12px 16px",
            borderBottom: "2px solid #e0e0e0",
            textAlign: "left",
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          Value
        </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ metric, value }, idx) => (
        <tr
          key={metric}
          style={{
            background: idx % 2 === 0 ? "#fafbfc" : "#fff",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <td style={{ padding: "10px 16px", fontSize: "0.97rem" }}>
            {metric}
          </td>
          <td style={{ padding: "10px 16px", fontSize: "0.97rem" }}>
            {value !== null && value !== undefined ? value : "-"}
          </td>
        </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MetricsDisplay;
