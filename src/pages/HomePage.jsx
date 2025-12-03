import { useState, useMemo } from 'react';
import { games } from '../data/games';
import { useAuth } from '../context/AuthContext';
import GameCard from '../components/GameCard';
import FilterBar from '../components/FilterBar';
import HowToPlay from '../components/HowToPlay';
import EmailModal from '../components/EmailModal';
import FAQ from '../components/FAQ';
import { Sparkles, Lock, Gift, Star, TreePine } from 'lucide-react';

// Snowflake component for animated snow
function Snowflakes() {
  const flakes = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${5 + Math.random() * 10}s`,
    size: Math.random() > 0.5 ? '1rem' : '0.75rem',
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {flakes.map((flake) => (
        <span
          key={flake.id}
          className="snowflake"
          style={{
            left: flake.left,
            animationDelay: flake.delay,
            animationDuration: flake.duration,
            fontSize: flake.size,
          }}
        >
          *
        </span>
      ))}
    </div>
  );
}

export default function HomePage() {
  const { isUnlocked, unlock } = useAuth();
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [filters, setFilters] = useState({
    modes: [],
    location: [],
    age: [],
  });

  // Calculate game counts for filter chips
  const gameCounts = useMemo(() => {
    const counts = {
      modes: {},
      location: {},
      age: {},
    };

    games.forEach((game) => {
      counts.age[game.age] = (counts.age[game.age] || 0) + 1;
      counts.location[game.location] = (counts.location[game.location] || 0) + 1;
      game.modes.forEach((mode) => {
        counts.modes[mode] = (counts.modes[mode] || 0) + 1;
      });
    });

    return counts;
  }, []);

  // Filter games
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      if (filters.age.length > 0 && !filters.age.includes(game.age)) {
        return false;
      }
      if (filters.location.length > 0 && !filters.location.includes(game.location)) {
        return false;
      }
      if (
        filters.modes.length > 0 &&
        !filters.modes.some((mode) => game.modes.includes(mode))
      ) {
        return false;
      }
      return true;
    });
  }, [filters]);

  const unlockedCount = filteredGames.filter((g) => g.free || isUnlocked).length;
  const lockedCount = filteredGames.filter((g) => !g.free && !isUnlocked).length;

  return (
    <div className="min-h-screen bg-holiday-snow">
      {/* Hero Section */}
      <section className="relative holiday-gradient py-16 md:py-20 overflow-hidden">
        <Snowflakes />

        {/* Decorative elements */}
        <div className="absolute top-8 left-8 text-holiday-gold/30 hidden lg:block">
          <Star size={40} />
        </div>
        <div className="absolute top-12 right-12 text-holiday-gold/30 hidden lg:block">
          <TreePine size={48} />
        </div>
        <div className="absolute bottom-8 left-16 text-holiday-gold/20 hidden lg:block">
          <Gift size={36} />
        </div>

        <div className="max-w-[1200px] mx-auto px-5 text-center relative z-10">
          {/* Holiday badge */}
          <div className="inline-flex items-center gap-2 bg-holiday-gold/20 text-holiday-gold-light px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            <Sparkles size={16} />
            <span>Holiday 2025 Edition</span>
            <Sparkles size={16} />
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            AI-Powered Party Games
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Copy a prompt, paste it into ChatGPT, Claude, or Gemini, and let AI host
            your holiday game night. Gather the family — no tech skills required!
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3 justify-center">
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30">
              <Gift size={16} />
              15 Unique Games
            </span>
            <span className="inline-flex items-center gap-2 bg-holiday-gold text-holiday-pine px-4 py-2 rounded-full text-sm font-semibold">
              <Star size={16} />
              Free to Play
            </span>
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30">
              <Sparkles size={16} />
              Works on Any AI
            </span>
          </div>
        </div>

        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-holiday-snow" style={{
          clipPath: 'ellipse(60% 100% at 50% 100%)'
        }} />
      </section>

      {/* How to Play (Collapsible) */}
      <section className="max-w-[1200px] mx-auto px-5 py-8">
        <HowToPlay collapsible defaultExpanded={false} variant="homepage" />
      </section>

      {/* Unlock Banner */}
      {!isUnlocked && (
        <section className="max-w-[1200px] mx-auto px-5 pb-6">
          <div className="holiday-gradient-red text-white rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Gift size={24} className="text-holiday-gold-light" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  Unwrap all {lockedCount} games!
                </h3>
                <p className="text-white/80 text-sm">
                  Enter your email to unlock the complete collection instantly
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowEmailModal(true)}
              className="btn-holiday-gold px-6 py-3 rounded-lg font-semibold whitespace-nowrap"
            >
              Unlock All Games
            </button>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="max-w-[1200px] mx-auto px-5 pb-12">
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          gameCounts={gameCounts}
        />

        {/* Results count */}
        <p className="text-sm text-mtm-text-secondary mb-4">
          Showing {filteredGames.length} game{filteredGames.length !== 1 ? 's' : ''}
          {!isUnlocked && ` (${unlockedCount} unlocked, ${lockedCount} locked)`}
        </p>

        {/* Game Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <GameCard
              key={game.slug}
              game={game}
              isUnlocked={isUnlocked}
            />
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <p className="text-mtm-text-secondary">
              No games match your filters. Try adjusting your selection.
            </p>
          </div>
        )}
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Email Modal */}
      <EmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSuccess={unlock}
      />
    </div>
  );
}
