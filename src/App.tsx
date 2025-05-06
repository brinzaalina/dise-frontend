import React from "react";
import "./App.css";
import {
  mockClusters,
  mockCommitStats,
  mockQualityMetrics,
  mockReleases,
} from "./mock/mockData";
import ProjectSelector from "./components/ProjectSelector";
import ReleaseSelector from "./components/ReleaseSelector";
import CommitStats from "./components/CommitStats";
import MetricsDisplay from "./components/MetricsDisplay";
import ClusterViewer from "./components/ClusterViewer";

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = React.useState<string>("");
  const [selectedReleases, setSelectedReleases] = React.useState<string[]>([]);
  const availableReleases = selectedProject
    ? mockReleases[selectedProject]
    : [];
  return (
    <div className="app-container">
      <h1>CCS and Clean Code Explorer</h1>
      <div className="section">
        <ProjectSelector
          projects={Object.keys(mockReleases)}
          selectedProject={selectedProject}
          onChange={(project) => {
            setSelectedProject(project);
            setSelectedReleases([]);
          }}
        />
        {selectedProject && (
          <div>
            <ReleaseSelector
              releases={availableReleases}
              selectedRelease={selectedReleases}
              onChange={(releases) => setSelectedReleases(releases)}
            />
          </div>
        )}
        {selectedProject && selectedReleases.length > 0 && (
          <div className="section">
            <h3>Selected Project: {selectedProject}</h3>
            <h3>Selected Releases: {selectedReleases.join(", ")}</h3>
          </div>
        )}
      </div>
      {selectedProject &&
        selectedReleases.length > 0 &&
        selectedReleases.map((release) => {
          const key = `${selectedProject}:${release}`;
          const commitData =
            mockCommitStats[key as keyof typeof mockCommitStats];
          const qualityData =
            mockQualityMetrics[key as keyof typeof mockQualityMetrics];
          return (
            <div key={release} className="section">
              <h2>Release: {release}</h2>
              {commitData ? (
                <CommitStats data={commitData} />
              ) : (
                <p>No commit data available for this release.</p>
              )}
              {qualityData ? (
                <MetricsDisplay data={qualityData} />
              ) : (
                <p>No quality metrics available for this release.</p>
              )}
            </div>
          );
        })}
      {selectedProject && selectedReleases.length > 0 && (
        <div className="section">
          <h3>Data Analysis</h3>
          <p>
            The data analysis will be displayed here. This could include
            clustering results or other insights based on the selected releases.
          </p>
          <ClusterViewer
            clusters={selectedReleases.map((release) => {
              const cluster = mockClusters[selectedProject]?.[release];
              return cluster
                ? `Release ${release} belongs to ${cluster}`
                : `No cluster assigned for ${release}`;
            })}
          />
        </div>
      )}
    </div>
  );
};

export default App;

