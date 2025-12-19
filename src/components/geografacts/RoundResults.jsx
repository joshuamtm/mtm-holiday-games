import { Check, X, Lightbulb, ChevronRight, RotateCcw } from 'lucide-react';

export default function RoundResults({
  country,
  roundScore,
  answeredQuestions,
  onNextRound,
  onEndGame,
  roundNumber,
  gameMode,
  currentTeam,
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-holiday-green to-holiday-green-light p-6 text-white">
        <h2 className="text-2xl font-bold mb-1">Round {roundNumber} Complete!</h2>
        <p className="opacity-90">
          The country was: <span className="font-bold">{country.name}</span>
        </p>
      </div>

      {/* Score summary */}
      <div className="p-6">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-holiday-green mb-1">
              {roundScore}
            </div>
            <div className="text-gray-500">out of 5 points</div>
          </div>
          <div className="h-16 w-px bg-gray-200" />
          <div className="text-center">
            <div className="text-3xl mb-1">
              {roundScore === 5
                ? '🌟'
                : roundScore >= 3
                ? '👍'
                : roundScore >= 1
                ? '🤔'
                : '😅'}
            </div>
            <div className="text-gray-500 text-sm">
              {roundScore === 5
                ? 'Perfect!'
                : roundScore >= 3
                ? 'Great job!'
                : roundScore >= 1
                ? 'Not bad!'
                : 'Keep trying!'}
            </div>
          </div>
        </div>

        {/* Question breakdown */}
        <div className="space-y-3 mb-6">
          {answeredQuestions.map((q) => (
            <div
              key={q.id}
              className={`p-3 rounded-lg ${
                q.isCorrect ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{q.icon}</span>
                  <span className="font-medium text-gray-800">{q.label}</span>
                  {q.hintUsed && (
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {q.isCorrect ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <X className="w-5 h-5 text-red-500" />
                  )}
                  <span
                    className={`font-bold ${
                      q.pointsEarned > 0 ? 'text-green-600' : 'text-gray-400'
                    }`}
                  >
                    +{q.pointsEarned}
                  </span>
                </div>
              </div>
              <div className="mt-1 text-sm">
                <span className="text-gray-500">Your answer: </span>
                <span
                  className={q.isCorrect ? 'text-green-700' : 'text-red-600'}
                >
                  {q.userAnswer}
                </span>
                {!q.isCorrect && (
                  <>
                    <span className="text-gray-500"> → Correct: </span>
                    <span className="text-gray-800 font-medium">
                      {q.correctAnswer}
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Country facts */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-800 mb-2">
            📚 About {country.name}
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-blue-600">Continent:</span>{' '}
              <span className="text-gray-800">{country.continent}</span>
            </div>
            <div>
              <span className="text-blue-600">Capital:</span>{' '}
              <span className="text-gray-800">{country.capital}</span>
            </div>
            <div>
              <span className="text-blue-600">Currency:</span>{' '}
              <span className="text-gray-800">{country.currency}</span>
            </div>
            <div>
              <span className="text-blue-600">Language:</span>{' '}
              <span className="text-gray-800">{country.language}</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={onEndGame}
            className="flex items-center gap-2 px-4 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            End Game
          </button>
          <button
            onClick={onNextRound}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 btn-holiday-gold rounded-lg font-semibold"
          >
            {gameMode === 'head-to-head' ? (
              <>
                Team {currentTeam === 1 ? 2 : 1}'s Turn
                <ChevronRight className="w-5 h-5" />
              </>
            ) : (
              <>
                Next Country
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
