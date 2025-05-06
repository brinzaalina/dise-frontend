import React from "react";

interface ProjectSelectorProps {
  projects: string[];
  selectedProject: string;
  onChange: (project: string) => void;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  projects,
  selectedProject,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor="project-select">Project: </label>
      <select
        id="project-select"
        value={selectedProject}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">--Select a project--</option>
        {projects.map((project) => (
          <option key={project} value={project}>
            {project}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProjectSelector;
