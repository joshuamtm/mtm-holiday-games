import { X, Filter, Sparkles } from 'lucide-react';

const modeOptions = [
  { value: 'solo-coop', label: 'Solo/Co-op' },
  { value: 'team-vs-team', label: 'Teams' },
  { value: 'player-vs-player', label: 'Competitive' },
  { value: 'multiplayer', label: 'Multiplayer' },
];

const locationOptions = [
  { value: 'remote-ok', label: 'Remote OK' },
  { value: 'same-room', label: 'In Person' },
];

const ageOptions = [
  { value: 'kids', label: 'Family' },
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

  const toggleKidPowered = () => {
    onFilterChange({ ...filters, kidPowered: !filters.kidPowered });
  };

  const clearFilters = () => {
    onFilterChange({ modes: [], location: [], age: [], kidPowered: false });
  };

  const hasActiveFilters =
    (filters.modes?.length || 0) +
    (filters.location?.length || 0) +
    (filters.age?.length || 0) +
    (filters.kidPowered ? 1 : 0) > 0;

  const FilterChip = ({ category, value, label }) => {
    const isActive = (filters[category] || []).includes(value);
    return (
      <button
        onClick={() => toggleFilter(category, value)}
        className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
          isActive
            ? 'bg-holiday-green text-white'
            : 'bg-holiday-snow text-holiday-pine hover:bg-holiday-green/10'
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 py-3 px-4 bg-white rounded-lg border border-holiday-green/20">
      {/* Filter icon and label */}
      <div className="flex items-center gap-1.5 text-holiday-pine/70">
        <Filter size={14} />
        <span className="text-xs font-medium">Filter:</span>
      </div>

      {/* Kid-Powered Filter - Special highlight */}
      <button
        onClick={toggleKidPowered}
        className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
          filters.kidPowered
            ? 'bg-holiday-gold text-holiday-pine'
            : 'bg-holiday-gold/20 text-holiday-pine hover:bg-holiday-gold/40'
        }`}
      >
        <Sparkles size={12} />
        Kid-Powered
      </button>

      <span className="text-holiday-green/30">|</span>

      {/* Age Filter */}
      <div className="flex items-center gap-1.5">
        {ageOptions.map((option) => (
          <FilterChip
            key={option.value}
            category="age"
            value={option.value}
            label={option.label}
          />
        ))}
      </div>

      <span className="text-holiday-green/30">|</span>

      {/* Location Filter */}
      <div className="flex items-center gap-1.5">
        {locationOptions.map((option) => (
          <FilterChip
            key={option.value}
            category="location"
            value={option.value}
            label={option.label}
          />
        ))}
      </div>

      <span className="text-holiday-green/30">|</span>

      {/* Mode Filter */}
      <div className="flex items-center gap-1.5">
        {modeOptions.map((option) => (
          <FilterChip
            key={option.value}
            category="modes"
            value={option.value}
            label={option.label}
          />
        ))}
      </div>

      {/* Clear button */}
      {hasActiveFilters && (
        <>
          <span className="text-holiday-green/30">|</span>
          <button
            onClick={clearFilters}
            className="text-xs text-holiday-red hover:text-holiday-red-dark transition-colors flex items-center gap-1"
          >
            <X size={12} />
            Clear
          </button>
        </>
      )}
    </div>
  );
}
