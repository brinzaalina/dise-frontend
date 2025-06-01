import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface CommitStatsProps {
  data: Record<string, number>;
}

const CommitStats: React.FC<CommitStatsProps> = ({ data }) => {
  const filteredEntries = Object.entries(data).filter(
    ([type]) => type !== "total_commits"
  );
  const chartData = filteredEntries.map(([type, count]) => ({
    type,
    count,
  }));
  const commitTypeColors: Record<string, string> = {
    feat: "#2ecc71", // green
    fix: "#e74c3c", // red
    refactor: "#3498db", // blue
    chore: "#95a5a6", // gray
    docs: "#f39c12", // orange
    test: "#9b59b6", // purple
    style: "#1abc9c", // teal
    perf: "#e67e22", // dark orange
    ci: "#34495e", // dark gray
    build: "#7f8c8d", // light gray
  };

  return (
    <div>
      <h3>Commit Type Distribution</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count">
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={commitTypeColors[entry.type] || "#8884d8"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CommitStats;
