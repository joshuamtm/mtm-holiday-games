import { Trophy, Medal, RotateCcw, Home, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GameOver({
  gameMode,
  scores,
  targetScore,
  winner,
  onPlayAgain,
  totalRounds,
  countriesPlayed,
}) {
  const isHeadToHead = gameMode === 'head-to-head';
  const isCoop = gameMode === 'coop';
  const coopWon = isCoop && scores.coop >= targetScore;
  const coopLost = isCoop && !coopWon;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div
          className={`p-8 text-center text-white ${
            coopLost
              ? 'bg-gradient-to-r from-red-500 to-red-600'
              : 'bg-gradient-to-r from-holiday-gold to-yellow-500'
          }`}
        >
          <div className="text-6xl mb-4">
            {coopLost ? '😔' : '🎉'}
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {isHeadToHead
              ? `Team ${winner} Wins!`
              : coopWon
              ? 'Victory!'
              : 'Game Over'}
          </h1>
          <p className="opacity-90">
            {isHeadToHead
              ? `First to reach ${targetScore} points!`
              : coopWon
              ? `You reached ${targetScore} points!`
              : `You ran out of strikes before reaching ${targetScore} points.`}
          </p>
        </div>

        {/* Stats */}
        <div className="p-6">
          {/* Final Scores */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-600 mb-3 text-center">
              Final Score
            </h3>

            {isHeadToHead ? (
              <div className="flex items-center justify-center gap-8">
                <div
                  className={`text-center p-4 rounded-xl ${
                    winner === 1
                      ? 'bg-yellow-100 border-2 border-yellow-400'
                      : 'bg-gray-100'
                  }`}
                >
                  {winner === 1 && (
                    <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  )}
                  <div className="text-3xl font-bold text-blue-600">
                    {scores.team1}
                  </div>
                  <div className="text-gray-600">Team 1</div>
                </div>

                <div className="text-2xl text-gray-400">vs</div>

                <div
                  className={`text-center p-4 rounded-xl ${
                    winner === 2
                      ? 'bg-yellow-100 border-2 border-yellow-400'
                      : 'bg-gray-100'
                  }`}
                >
                  {winner === 2 && (
                    <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  )}
                  <div className="text-3xl font-bold text-red-600">
                    {scores.team2}
                  </div>
                  <div className="text-gray-600">Team 2</div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div
                  className={`inline-block p-6 rounded-xl ${
                    coopWon
                      ? 'bg-green-100 border-2 border-green-400'
                      : 'bg-red-100 border-2 border-red-400'
                  }`}
                >
                  {coopWon ? (
                    <Trophy className="w-10 h-10 text-green-500 mx-auto mb-2" />
                  ) : (
                    <Medal className="w-10 h-10 text-red-400 mx-auto mb-2" />
                  )}
                  <div
                    className={`text-4xl font-bold ${
                      coopWon ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {scores.coop}
                  </div>
                  <div className="text-gray-600">
                    of {targetScore} points needed
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Game Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">
                {totalRounds}
              </div>
              <div className="text-sm text-gray-500">Rounds Played</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">
                {countriesPlayed?.length || 0}
              </div>
              <div className="text-sm text-gray-500">Countries Explored</div>
            </div>
          </div>

          {/* Countries played */}
          {countriesPlayed && countriesPlayed.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-600 mb-3">
                Countries You Visited
              </h3>
              <div className="flex flex-wrap gap-2">
                {countriesPlayed.map((country, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Rating */}
          <div className="bg-yellow-50 rounded-lg p-4 mb-6 text-center">
            <div className="flex justify-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, idx) => {
                const avgScore = isHeadToHead
                  ? (scores.team1 + scores.team2) / (totalRounds * 2 || 1)
                  : scores.coop / (totalRounds || 1);
                const filled = idx < Math.round(avgScore);
                return (
                  <Star
                    key={idx}
                    className={`w-6 h-6 ${
                      filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                  />
                );
              })}
            </div>
            <p className="text-sm text-gray-600">
              Average: {((isHeadToHead
                ? (scores.team1 + scores.team2) / (totalRounds * 2 || 1)
                : scores.coop / (totalRounds || 1)
              )).toFixed(1)} points per round
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex-1"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <button
              onClick={onPlayAgain}
              className="flex items-center justify-center gap-2 px-6 py-3 btn-holiday-gold rounded-lg font-semibold flex-1"
            >
              <RotateCcw className="w-4 h-4" />
              Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
