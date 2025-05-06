import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface MetricsDisplayProps {
  data: Record<string, number>;
}

const MetricsDisplay: React.FC<MetricsDisplayProps> = ({ data }) => {
  const metricColors: Record<string, string> = {
    maintainability: "#e74c3c", // red
    linesOfCode: "#2ecc71", // green
    cyclomaticComplexity: "#f1c40f", // yellow
    codeSmells: "#9b59b6", // purple
  };
  const chartData = Object.entries(data).map(([metric, value]) => ({
    metric,
    value,
  }));

  return (
    <div>
      <h3>Code Quality Metrics</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="metric" />
          <Tooltip />
          <Bar dataKey="value">
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={metricColors[entry.metric] || "#8884d8"}
              />
            ))}
            <LabelList dataKey="value" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MetricsDisplay;
