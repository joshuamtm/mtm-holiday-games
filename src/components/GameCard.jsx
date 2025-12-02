import { Link } from 'react-router-dom';
import { Users, Clock, MapPin, Lock } from 'lucide-react';
import { modeLabels, locationLabels } from '../data/games';

export default function GameCard({ game, isUnlocked }) {
  const canAccess = game.free || isUnlocked;

  return (
    <Link
      to={`/game/${game.slug}`}
      className="block bg-white rounded-lg p-6 shadow-[0_2px_4px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.12)] transition-shadow border border-mtm-border"
    >
      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        {game.free && (
          <span className="bg-mtm-accent text-white text-xs font-medium px-2 py-1 rounded">
            FREE
          </span>
        )}
        <span
          className={`text-white text-xs font-medium px-2 py-1 rounded ${
            game.age === 'kids' ? 'bg-mtm-primary' : 'bg-mtm-navy'
          }`}
        >
          {game.age === 'kids' ? 'Family Friendly' : 'Adults'}
        </span>
        {!canAccess && (
          <span className="bg-gray-200 text-gray-600 text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
            <Lock size={12} />
            Locked
          </span>
        )}
      </div>

      {/* Title & Subtitle */}
      <h3 className="text-xl font-semibold text-mtm-navy mb-1">{game.title}</h3>
      <p className="text-sm text-mtm-primary font-medium mb-2">{game.subtitle}</p>

      {/* Description */}
      <p className="text-sm text-mtm-text-secondary mb-4 line-clamp-2">
        {game.description}
      </p>

      {/* Metadata */}
      <div className="flex flex-wrap gap-3 text-xs text-mtm-text-secondary">
        <span className="flex items-center gap-1">
          <Users size={14} className="text-mtm-soft-blue" />
          {game.players.min}-{game.players.max} players
        </span>
        <span className="flex items-center gap-1">
          <Clock size={14} className="text-mtm-soft-blue" />
          {game.duration}
        </span>
        <span className="flex items-center gap-1">
          <MapPin size={14} className="text-mtm-soft-blue" />
          {locationLabels[game.location]}
        </span>
      </div>

      {/* Mode Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {game.modes.map((mode) => (
          <span
            key={mode}
            className="text-xs bg-mtm-cream text-mtm-navy px-2 py-1 rounded"
          >
            {modeLabels[mode]}
          </span>
        ))}
      </div>
    </Link>
  );
}
