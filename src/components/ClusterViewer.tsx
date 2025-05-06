import exp from "constants";
import React from "react";

interface ClusterViewerProps {
  clusters: string[];
}

const ClusterViewer: React.FC<ClusterViewerProps> = ({ clusters }) => {
  return (
    <div>
      <h3>Data Analysis</h3>
      {clusters.length > 0 ? (
        <ul>
          {clusters.map((cluster, index) => (
            <li key={index}>{cluster}</li>
          ))}
        </ul>
      ) : (
        <p>No clustering results available.</p>
      )}
    </div>
  );
};

export default ClusterViewer;
