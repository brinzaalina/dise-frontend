import React from "react";

interface ReleaseSelectorProps {
  releases: string[];
  selectedRelease: string[];
  onChange: (release: string[]) => void;
}

const ReleaseSelector: React.FC<ReleaseSelectorProps> = ({
  releases,
  selectedRelease,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    onChange(selected);
  };

  return (
    <div>
      <label htmlFor="release-select">Releases: </label>
      <select
        id="release-select"
        multiple
        value={selectedRelease}
        onChange={handleChange}
      >
        {releases.map((release) => (
          <option key={release} value={release}>
            {release}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ReleaseSelector;
