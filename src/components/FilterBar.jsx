import { X, Filter, Sparkles, Zap, Users, PartyPopper, Brain, Moon } from 'lucide-react';

const modeOptions = [
  { value: 'solo-coop', label: 'Solo/Together', description: 'Play alone or with your team against the AI' },
  { value: 'team-vs-team', label: 'Teams', description: 'Split into teams and compete' },
  { value: 'player-vs-player', label: 'Face Off', description: 'Individual players compete' },
  { value: 'multiplayer', label: 'Group', description: 'Everyone plays with rotating roles' },
];

const locationOptions = [
  { value: 'remote-ok', label: 'Remote OK' },
  { value: 'same-room', label: 'In Person' },
];

const ageOptions = [
  { value: 'kids', label: 'Family' },
  { value: 'adults', label: 'Adults' },
];

const bestForOptions = [
  { value: 'starting-the-party', label: 'Party Starter', icon: Zap, description: 'Quick games to kick things off' },
  { value: 'getting-to-know-you', label: 'Icebreaker', icon: Users, description: 'Great for new groups' },
  { value: 'family-game-night', label: 'Family Night', icon: PartyPopper, description: 'Fun for all ages' },
  { value: 'brain-teasers', label: 'Brain Games', icon: Brain, description: 'Puzzles and mysteries' },
  { value: 'late-night', label: 'Late Night', icon: Moon, description: 'Adult humor and energy' },
];

export default function FilterBar({ filters, onFilterChange }) {

  const toggleFilter = (category, value) => {
    const current = filters[category] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange({ ...filters, [category]: updated });
  };

  const toggleBestFor = (value) => {
    const current = filters.bestFor || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange({ ...filters, bestFor: updated });
  };

  const toggleKidPowered = () => {
    onFilterChange({ ...filters, kidPowered: !filters.kidPowered });
  };

  const clearFilters = () => {
    onFilterChange({ modes: [], location: [], age: [], bestFor: [], kidPowered: false });
  };

  const hasActiveFilters =
    (filters.modes?.length || 0) +
    (filters.location?.length || 0) +
    (filters.age?.length || 0) +
    (filters.bestFor?.length || 0) +
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
    <div className="mb-4 space-y-3">
      {/* Best For Quick Filters - Scenario-based */}
      <div className="flex flex-wrap items-center gap-2 py-3 px-4 bg-gradient-to-r from-holiday-gold/10 via-white to-holiday-gold/10 rounded-lg border border-holiday-gold/30">
        <span className="text-xs font-semibold text-holiday-pine mr-1">What are you looking for?</span>
        {bestForOptions.map((option) => {
          const Icon = option.icon;
          const isActive = (filters.bestFor || []).includes(option.value);
          return (
            <div key={option.value} className="relative group">
              <button
                onClick={() => toggleBestFor(option.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-holiday-gold text-holiday-pine shadow-sm'
                    : 'bg-white text-holiday-pine hover:bg-holiday-gold/20 border border-holiday-gold/30'
                }`}
              >
                <Icon size={14} />
                {option.label}
              </button>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-holiday-pine text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                {option.description}
              </div>
            </div>
          );
        })}
      </div>

      {/* Advanced Filters */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3 px-4 bg-white rounded-lg border border-holiday-green/20">
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

        {/* Mode Filter with tooltips */}
        <div className="flex items-center gap-1.5">
          {modeOptions.map((option) => {
            const isActive = (filters.modes || []).includes(option.value);
            return (
              <div key={option.value} className="relative group">
                <button
                  onClick={() => toggleFilter('modes', option.value)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-holiday-green text-white'
                      : 'bg-holiday-snow text-holiday-pine hover:bg-holiday-green/10'
                  }`}
                >
                  {option.label}
                </button>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-holiday-pine text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  {option.description}
                </div>
              </div>
            );
          })}
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
    </div>
  );
}
