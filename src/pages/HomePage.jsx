import { useState, useMemo } from 'react';
import { games } from '../data/games';
import { useAuth } from '../context/AuthContext';
import GameCard from '../components/GameCard';
import FilterBar from '../components/FilterBar';
import HowToPlay from '../components/HowToPlay';
import EmailModal from '../components/EmailModal';
import FAQ from '../components/FAQ';
import { Sparkles, Lock } from 'lucide-react';

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
      // Age
      counts.age[game.age] = (counts.age[game.age] || 0) + 1;

      // Location
      counts.location[game.location] = (counts.location[game.location] || 0) + 1;

      // Modes (game can have multiple)
      game.modes.forEach((mode) => {
        counts.modes[mode] = (counts.modes[mode] || 0) + 1;
      });
    });

    return counts;
  }, []);

  // Filter games
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      // Age filter
      if (filters.age.length > 0 && !filters.age.includes(game.age)) {
        return false;
      }

      // Location filter
      if (filters.location.length > 0 && !filters.location.includes(game.location)) {
        return false;
      }

      // Mode filter (game must have at least one matching mode)
      if (
        filters.modes.length > 0 &&
        !filters.modes.some((mode) => game.modes.includes(mode))
      ) {
        return false;
      }

      return true;
    });
  }, [filters]);

  // Count unlocked vs locked games
  const unlockedCount = filteredGames.filter((g) => g.free || isUnlocked).length;
  const lockedCount = filteredGames.filter((g) => !g.free && !isUnlocked).length;

  return (
    <div className="min-h-screen bg-mtm-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-mtm-cream to-mtm-white py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-5 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-mtm-navy mb-4">
            AI-Powered Party Games
          </h1>
          <p className="text-lg text-mtm-text-secondary max-w-2xl mx-auto mb-6">
            Copy a prompt, paste it into ChatGPT, Claude, or Gemini, and let AI host
            your next game night. No tech skills required!
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <span className="inline-flex items-center gap-2 bg-mtm-primary/10 text-mtm-primary px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles size={16} />
              12 Unique Games
            </span>
            <span className="inline-flex items-center gap-2 bg-mtm-accent/10 text-mtm-accent px-4 py-2 rounded-full text-sm font-medium">
              Free to Play
            </span>
            <span className="inline-flex items-center gap-2 bg-mtm-navy/10 text-mtm-navy px-4 py-2 rounded-full text-sm font-medium">
              Works on Any AI
            </span>
          </div>
        </div>
      </section>

      {/* How to Play (Collapsible) */}
      <section className="max-w-[1200px] mx-auto px-5 py-8">
        <HowToPlay collapsible defaultExpanded={false} />
      </section>

      {/* Unlock Banner */}
      {!isUnlocked && (
        <section className="max-w-[1200px] mx-auto px-5 pb-6">
          <div className="bg-mtm-navy text-white rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Lock size={24} className="text-mtm-accent" />
              <div>
                <h3 className="font-semibold text-lg">
                  {lockedCount} games are locked
                </h3>
                <p className="text-white/80 text-sm">
                  Enter your email to unlock all 12 games instantly
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowEmailModal(true)}
              className="bg-mtm-accent text-white px-6 py-3 rounded-md font-medium hover:bg-mtm-accent/90 transition-colors whitespace-nowrap"
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
