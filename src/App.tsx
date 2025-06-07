import React, {useState, ChangeEvent, FormEvent} from "react";
import "./App.css";
import ReleaseSelector from "./components/ReleaseSelector";
import CommitStats from "./components/CommitStats";
import MetricsDisplay from "./components/MetricsDisplay";
import ClusterViewer from "./components/ClusterViewer";

interface AnalysisData {
  releases: string[];
  commit_stats: Record<string, Record<string, number>>;
  commit_ratios: Record<string, Record<string, number>>;
  quality_metrics: Record<string, Record<string, number>>;
  cluster_assignment: Record<string, number>;
  pca_loadings: Record<string, {PC1: number; PC2: number}>;
  cluster_profiles: Record<string, Record<string, number>>;
  correlations: Record<string, Record<string, number>>;
  pca_projection: Record<string, {PC1: number; PC2: number}>;
}

const App: React.FC = () => {
  const [commitsFile, setCommitsFile] = useState<File | null>(null);
  const [metricsFile, setMetricsFile] = useState<File | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [excelFile, setExcelFile] = useState<string | null>(null);
  const [clusterPlot, setClusterPlot] = useState<string | null>(null);
  const [selectedReleases, setSelectedReleases] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCommitsChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setCommitsFile(event.target.files[0]);
    }
  };

  const handleMetricsChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setMetricsFile(event.target.files[0]);
    }
  };

  const handleAnalyze = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    if (!commitsFile || !metricsFile) {
      setError("Please upload both commits and metrics files.");
      return;
    }

    setLoading(true);
    setAnalysisData(null);
    setExcelFile(null);
    setClusterPlot(null);
    setSelectedReleases([]);

    const formData = new FormData();
    formData.append("commits_file", commitsFile);
    formData.append("metrics_file", metricsFile);

    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.error || "Failed to analyze data");
      }
      const json = await response.json();
      const data: AnalysisData = json.analysis_data;
      setAnalysisData(data);
      setExcelFile(json.excel_file);
      setClusterPlot(json.cluster_plot);
    } catch (err) {
      console.error("Error during analysis:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>CCS & Clean Code Explorer</h1>
      <form onSubmit={handleAnalyze} className="upload-form">
        <div>
          <label htmlFor="commits-file">Upload Commits File:</label>
          <input
            type="file"
            id="commits-file"
            accept=".json"
            onChange={handleCommitsChange}
          />
        </div>
        <div>
          <label htmlFor="metrics-file">Upload Metrics File:</label>
          <input
            type="file"
            id="metrics-file"
            accept=".json"
            onChange={handleMetricsChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}

      {analysisData && (
        <>
          <div className="section">
            <h2>Clustering Overview</h2>
            { clusterPlot ? (
                <div className="cluster-plot" style={{ display: "flex", justifyContent: "center" }}>
                <img src={`http://localhost:5000/download/${clusterPlot}`} alt="Cluster Plot" />
                </div>
            ) : (
              <p>No cluster plot available.</p>
            )}
          </div>
          <div className="section">
            <h2>Releases</h2>
            <ReleaseSelector
              releases={analysisData.releases}
              selectedRelease={selectedReleases}
              onChange={setSelectedReleases}
            />
          </div>
        </>
      )}
      { analysisData && 
        selectedReleases.length > 0 && 
        selectedReleases.map((release) => {
          const commitData = analysisData.commit_stats[release] || {};
          const qualityData = analysisData.quality_metrics[release] || {};
          const clusterId = analysisData.cluster_assignment[release] || 0;
          return (
            <div key={release} className="section">
              <h2>Release: {release}</h2>
              <div className="chart-row">
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
              <ClusterViewer clusters={[`Release ${release} - Cluster ${clusterId}`]} />
            </div>
          );
        })}
        { excelFile && (
          <div className="section">
            <h2>Download Analysis Report</h2>
            <a href={`http://localhost:5000/download/${excelFile}`} download>
              Download Excel Report
            </a>
            <br />
            <a href={`http://localhost:5000/download/${clusterPlot}`} download>
              Download Cluster Plot
            </a>
          </div>
          )
        }
    </div>
  );
}

export default App;