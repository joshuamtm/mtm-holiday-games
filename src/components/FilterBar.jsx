import { X } from 'lucide-react';

const modeOptions = [
  { value: 'solo-coop', label: 'Solo/Co-op' },
  { value: 'team-vs-team', label: 'Team vs Team' },
  { value: 'player-vs-player', label: 'Player vs Player' },
  { value: 'multiplayer', label: 'Multiplayer' },
];

const locationOptions = [
  { value: 'remote-ok', label: 'Remote OK' },
  { value: 'same-room', label: 'Same Room' },
];

const ageOptions = [
  { value: 'kids', label: 'Family Friendly' },
  { value: 'adults', label: 'Adults' },
];

export default function FilterBar({ filters, onFilterChange, gameCounts }) {
  const toggleFilter = (category, value) => {
    const current = filters[category] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange({ ...filters, [category]: updated });
  };

  const clearFilters = () => {
    onFilterChange({ modes: [], location: [], age: [] });
  };

  const hasActiveFilters =
    (filters.modes?.length || 0) +
    (filters.location?.length || 0) +
    (filters.age?.length || 0) > 0;

  const FilterChip = ({ category, value, label, count }) => {
    const isActive = (filters[category] || []).includes(value);
    return (
      <button
        onClick={() => toggleFilter(category, value)}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          isActive
            ? 'bg-mtm-primary text-white'
            : 'bg-white border border-mtm-border text-mtm-text hover:border-mtm-primary'
        }`}
      >
        {label}
        {count !== undefined && (
          <span className={`ml-1.5 ${isActive ? 'text-white/80' : 'text-mtm-text-secondary'}`}>
            ({count})
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="bg-mtm-cream rounded-lg p-4 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h3 className="font-semibold text-mtm-navy">Filter Games</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-mtm-primary hover:text-mtm-navy transition-colors flex items-center gap-1"
          >
            <X size={14} />
            Clear All
          </button>
        )}
      </div>

      {/* Age Filter */}
      <div className="mb-4">
        <p className="text-xs font-medium text-mtm-text-secondary uppercase tracking-wide mb-2">
          Audience
        </p>
        <div className="flex flex-wrap gap-2">
          {ageOptions.map((option) => (
            <FilterChip
              key={option.value}
              category="age"
              value={option.value}
              label={option.label}
              count={gameCounts?.age?.[option.value]}
            />
          ))}
        </div>
      </div>

      {/* Mode Filter */}
      <div className="mb-4">
        <p className="text-xs font-medium text-mtm-text-secondary uppercase tracking-wide mb-2">
          Game Mode
        </p>
        <div className="flex flex-wrap gap-2">
          {modeOptions.map((option) => (
            <FilterChip
              key={option.value}
              category="modes"
              value={option.value}
              label={option.label}
              count={gameCounts?.modes?.[option.value]}
            />
          ))}
        </div>
      </div>

      {/* Location Filter */}
      <div>
        <p className="text-xs font-medium text-mtm-text-secondary uppercase tracking-wide mb-2">
          Location
        </p>
        <div className="flex flex-wrap gap-2">
          {locationOptions.map((option) => (
            <FilterChip
              key={option.value}
              category="location"
              value={option.value}
              label={option.label}
              count={gameCounts?.location?.[option.value]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
