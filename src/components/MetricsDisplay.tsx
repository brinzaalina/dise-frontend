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
  const rows = Object.entries(data).map(([metric, value]) => ({
    metric,
    value,
  }));

  return (
    <div>
      <h3>Code Quality Metrics</h3>
      <table className="metrics-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ metric, value }) => (
            <tr key={metric}>
              <td>{metric}</td>
              <td>{value !== null && value !== undefined ? value : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MetricsDisplay;
