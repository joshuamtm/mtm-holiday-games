import { Trophy, Target, X, Users, User } from 'lucide-react';

export default function ScoreBoard({
  gameMode,
  scores,
  targetScore,
  maxStrikes,
  strikes,
  currentTeam,
  roundNumber,
}) {
  const isHeadToHead = gameMode === 'head-to-head';
  const isCoop = gameMode === 'coop';

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-holiday-gold" />
          Scoreboard
        </h3>
        <span className="text-sm text-gray-500">Round {roundNumber}</span>
      </div>

      {/* Target display */}
      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <Target className="w-4 h-4" />
          <span className="text-sm">
            {isHeadToHead
              ? `First to ${targetScore} points wins!`
              : `Reach ${targetScore} points before ${maxStrikes} strikes!`}
          </span>
        </div>
      </div>

      {/* Head to Head Scores */}
      {isHeadToHead && (
        <div className="space-y-3">
          <div
            className={`flex items-center justify-between p-3 rounded-lg transition-all ${
              currentTeam === 1
                ? 'bg-blue-100 border-2 border-blue-400'
                : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-800">Team 1</span>
              {currentTeam === 1 && (
                <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                  Playing
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {scores.team1}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <span className="text-gray-400 font-bold">VS</span>
          </div>

          <div
            className={`flex items-center justify-between p-3 rounded-lg transition-all ${
              currentTeam === 2
                ? 'bg-red-100 border-2 border-red-400'
                : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-gray-800">Team 2</span>
              {currentTeam === 2 && (
                <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                  Playing
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-red-600">
              {scores.team2}
            </div>
          </div>

          {/* Progress bars */}
          <div className="mt-4 space-y-2">
            <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${(scores.team1 / targetScore) * 100}%` }}
              />
            </div>
            <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-red-500 transition-all duration-500"
                style={{ width: `${(scores.team2 / targetScore) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Co-op Score */}
      {isCoop && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-gray-800">Team Score</span>
            </div>
            <div className="text-3xl font-bold text-green-600">
              {scores.coop}
            </div>
          </div>

          {/* Progress to target */}
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>
                {scores.coop} / {targetScore}
              </span>
            </div>
            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                style={{
                  width: `${Math.min((scores.coop / targetScore) * 100, 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Strikes */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Strikes</span>
              <span className="text-sm text-gray-500">
                {strikes} / {maxStrikes}
              </span>
            </div>
            <div className="flex gap-2 justify-center">
              {Array.from({ length: maxStrikes }).map((_, idx) => (
                <div
                  key={idx}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    idx < strikes
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  <X className="w-5 h-5" />
                </div>
              ))}
            </div>
            {strikes >= maxStrikes - 1 && strikes < maxStrikes && (
              <p className="text-center text-red-500 text-sm mt-2 font-medium">
                One strike left!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
