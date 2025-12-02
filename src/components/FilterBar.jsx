import { X, Sparkles } from 'lucide-react';

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
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
          isActive
            ? 'bg-holiday-green text-white shadow-sm'
            : 'bg-white border border-holiday-green/30 text-holiday-pine hover:border-holiday-green hover:bg-holiday-green/5'
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
    <div className="bg-white rounded-xl p-4 mb-6 border border-holiday-green/20 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h3 className="font-semibold text-holiday-pine flex items-center gap-2">
          <Sparkles size={16} className="text-holiday-gold" />
          Filter Games
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-holiday-red hover:text-holiday-red-dark transition-colors flex items-center gap-1"
          >
            <X size={14} />
            Clear All
          </button>
        )}
      </div>

      {/* Age Filter */}
      <div className="mb-4">
        <p className="text-xs font-medium text-holiday-pine/70 uppercase tracking-wide mb-2">
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
        <p className="text-xs font-medium text-holiday-pine/70 uppercase tracking-wide mb-2">
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
        <p className="text-xs font-medium text-holiday-pine/70 uppercase tracking-wide mb-2">
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
