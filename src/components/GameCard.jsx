import { Link } from 'react-router-dom';
import { Users, Clock, MapPin, Lock, Star, Gift, Sparkles, Gamepad2 } from 'lucide-react';
import { modeLabels, locationLabels } from '../data/games';

export default function GameCard({ game, isUnlocked }) {
  const canAccess = game.free || isUnlocked;
  // Interactive games link to their play URL, others to the game detail page
  const linkTo = game.isInteractive ? game.playUrl : `/game/${game.slug}`;

  return (
    <Link
      to={linkTo}
      className="group block bg-white rounded-xl p-6 festive-card relative overflow-hidden"
    >
      {/* Decorative corner ribbon for free game */}
      {game.free && (
        <div className="absolute -top-1 -right-1">
          <div className="bg-holiday-gold text-holiday-pine text-xs font-bold px-6 py-1 rotate-45 transform translate-x-4 translate-y-2 shadow-md">
            FREE
          </div>
        </div>
      )}

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        {game.isInteractive && (
          <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            <Gamepad2 size={12} />
            Play Now
          </span>
        )}
        {game.kidPowered && (
          <span className="bg-holiday-gold text-holiday-pine text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            <Sparkles size={12} />
            Kid-Powered
          </span>
        )}
        <span
          className={`text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1 ${
            game.age === 'kids' ? 'bg-holiday-green' : 'bg-holiday-red'
          }`}
        >
          {game.age === 'kids' ? (
            <>
              <Gift size={12} />
              Family Friendly
            </>
          ) : (
            <>
              <Star size={12} />
              Adults
            </>
          )}
        </span>
        {!canAccess && (
          <span className="bg-gray-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
            <Lock size={12} />
            Locked
          </span>
        )}
      </div>

      {/* Title & Subtitle */}
      <h3 className="text-xl font-semibold text-holiday-pine mb-1 group-hover:text-holiday-green transition-colors">
        {game.title}
      </h3>
      <p className="text-sm text-holiday-red font-medium mb-2">{game.subtitle}</p>

      {/* Description */}
      <p className="text-sm text-mtm-text-secondary mb-4 line-clamp-2">
        {game.description}
      </p>

      {/* Metadata */}
      <div className="flex flex-wrap gap-3 text-xs text-mtm-text-secondary">
        <span className="flex items-center gap-1">
          <Users size={14} className="text-holiday-green" />
          {game.players.min}-{game.players.max} players
        </span>
        <span className="flex items-center gap-1">
          <Clock size={14} className="text-holiday-green" />
          {game.duration}
        </span>
        <span className="flex items-center gap-1">
          <MapPin size={14} className="text-holiday-green" />
          {locationLabels[game.location]}
        </span>
      </div>

      {/* Mode Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {game.modes.map((mode) => (
          <span
            key={mode}
            className="text-xs bg-holiday-snow text-holiday-pine px-2 py-1 rounded-full border border-holiday-green/20"
          >
            {modeLabels[mode]}
          </span>
        ))}
      </div>

      {/* Hover indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-holiday-gold transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
    </Link>
  );
}
