export const mockProjects = ["FreeMind", "jEdit", "TuxGuitar"];

export const mockReleases: Record<string, string[]> = {
  FreeMind: ["0.4.0", "0.6.0", "0.8.0"],
  jedit: ["4.5.0", "4.6.0", "5.0.0"],
  tuxguitar: ["1.5.0", "1.6.0", "1.7.0"],
};

export const mockCommitStats = {
  "FreeMind:0.4.0": {
    feat: 12,
    fix: 8,
    refactor: 5,
    chore: 2,
  },
  "FreeMind:0.6.0": {
    feat: 15,
    fix: 10,
    refactor: 7,
    chore: 3,
  },
};

export const mockQualityMetrics = {
  "FreeMind:0.4.0": {
    maintainability: 80,
    cyclomaticComplexity: 5,
    linesOfCode: 2000,
    codeSmells: 10,
  },
  "FreeMind:0.6.0": {
    maintainability: 85,
    cyclomaticComplexity: 4,
    linesOfCode: 2200,
    codeSmells: 8,
  },
};

export const mockClusters: Record<string, Record<string, string>> = {
  FreeMind: {
    "0.4.0": "Cluster A",
    "0.6.0": "Cluster C",
  },
  jEdit: {},
  TuxGuitar: {},
};
