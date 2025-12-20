import { Users, User, Globe, Zap, Brain, Trophy } from 'lucide-react';
import { difficultyLabels, difficultyDescriptions } from '../../data/countries';

export default function GameSetup({ onStartGame }) {
  const gameModes = [
    {
      id: 'head-to-head',
      title: 'Head to Head',
      description: 'Two teams compete - first to 20 points wins!',
      icon: Users,
      color: 'blue',
    },
    {
      id: 'coop',
      title: 'Co-op Challenge',
      description: 'Work together to reach 20 points before 5 strikes!',
      icon: User,
      color: 'green',
    },
  ];

  const difficulties = [
    {
      id: 'easy',
      icon: Globe,
      color: 'green',
      examples: 'USA, France, Japan, Brazil...',
    },
    {
      id: 'medium',
      icon: Zap,
      color: 'yellow',
      examples: 'Sweden, Thailand, Morocco, Chile...',
    },
    {
      id: 'hard',
      icon: Brain,
      color: 'red',
      examples: 'Bhutan, Lesotho, Malta, Suriname...',
    },
    {
      id: 'mixed',
      icon: Trophy,
      color: 'purple',
      examples: 'Random mix of all difficulties',
    },
  ];

  const handleStart = (mode, difficulty) => {
    onStartGame(mode, difficulty);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Inspiration Note */}
      <div className="text-center mb-8">
        <p className="text-lg text-gray-600 mb-2">
          Test your geography knowledge! Identify countries, capitals, currencies, and more.
        </p>
        <p className="text-sm text-gray-500">
          Inspired by the classic board game{' '}
          <a
            href="https://boardgamegeek.com/boardgame/12378/geografacts"
            target="_blank"
            rel="noopener noreferrer"
            className="text-holiday-blue hover:text-holiday-pine underline"
          >
            GeograFacts
          </a>
          {' '}(discontinued)
        </p>
      </div>

      {/* How to Play */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📖 How to Play</h2>

        {/* Game Overview */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-blue-800">
            A country will be <strong>highlighted in red</strong> on the world map.
            Answer 5 questions about that country to earn points. The more you know, the more you score!
          </p>
        </div>

        {/* 5 Questions */}
        <h3 className="font-semibold text-gray-700 mb-3">Answer these 5 questions (1 point each):</h3>
        <div className="grid md:grid-cols-5 gap-3 mb-6">
          {[
            { emoji: '🌍', label: 'Continent', desc: 'Which continent?' },
            { emoji: '🏳️', label: 'Country', desc: 'Name the country' },
            { emoji: '🏛️', label: 'Capital', desc: 'Capital city?' },
            { emoji: '🗣️', label: 'Language', desc: 'Official language?' },
            { emoji: '💰', label: 'Currency', desc: 'What money?' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="text-2xl mb-1">{item.emoji}</div>
              <div className="font-semibold text-gray-800 text-sm">
                {item.label}
              </div>
              <div className="text-xs text-gray-500">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Game Modes */}
        <h3 className="font-semibold text-gray-700 mb-3">Two ways to play:</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-blue-800">Head to Head</span>
            </div>
            <p className="text-sm text-blue-700">
              Teams take turns. First team to <strong>20 points</strong> wins!
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-5 h-5 text-green-600" />
              <span className="font-bold text-green-800">Co-op Challenge</span>
            </div>
            <p className="text-sm text-green-700">
              Work together to reach <strong>20 points</strong> before getting <strong>5 wrong answers</strong> (strikes)!
            </p>
          </div>
        </div>

        {/* Hints */}
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 mb-4">
          <p className="text-sm text-yellow-800">
            <strong>💡 Need help?</strong> You can use a hint for any question, but using a hint means you can't earn a point for that question (even if you answer correctly after).
          </p>
        </div>

        {/* Continent Note */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-700">
            <strong>🗺️ Geography Note:</strong> This game uses 6 continents. <strong>North America</strong> includes Central America (Guatemala, Panama, etc.) and the Caribbean (Cuba, Jamaica, etc.). <strong>Oceania</strong> includes Australia, New Zealand, and Pacific islands.
          </p>
        </div>
      </div>

      {/* Game Mode Selection */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Choose Your Game Mode
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {gameModes.map((mode) => {
            const Icon = mode.icon;
            return (
              <div
                key={mode.id}
                className={`p-6 rounded-xl border-2 border-${mode.color}-200 bg-${mode.color}-50 hover:border-${mode.color}-400 transition-all`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-12 h-12 rounded-full bg-${mode.color}-100 flex items-center justify-center`}
                  >
                    <Icon className={`w-6 h-6 text-${mode.color}-600`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{mode.title}</h3>
                    <p className="text-sm text-gray-600">{mode.description}</p>
                  </div>
                </div>

                {/* Difficulty buttons for this mode */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {difficulties.map((diff) => {
                    const DiffIcon = diff.icon;
                    return (
                      <button
                        key={diff.id}
                        onClick={() => handleStart(mode.id, diff.id)}
                        className={`p-3 rounded-lg border-2 hover:scale-105 transition-all ${
                          diff.color === 'green'
                            ? 'border-green-300 bg-green-50 hover:bg-green-100 hover:border-green-400'
                            : diff.color === 'yellow'
                            ? 'border-yellow-300 bg-yellow-50 hover:bg-yellow-100 hover:border-yellow-400'
                            : diff.color === 'red'
                            ? 'border-red-300 bg-red-50 hover:bg-red-100 hover:border-red-400'
                            : 'border-purple-300 bg-purple-50 hover:bg-purple-100 hover:border-purple-400'
                        }`}
                      >
                        <div className="flex items-center gap-2 justify-center mb-1">
                          <DiffIcon className={`w-4 h-4 ${
                            diff.color === 'green'
                              ? 'text-green-600'
                              : diff.color === 'yellow'
                              ? 'text-yellow-600'
                              : diff.color === 'red'
                              ? 'text-red-600'
                              : 'text-purple-600'
                          }`} />
                          <span className="font-semibold text-gray-800">
                            {difficultyLabels[diff.id] || 'Mixed'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 truncate">
                          {diff.examples}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Difficulty Legend */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Difficulty Levels
        </h2>
        <div className="space-y-3">
          {difficulties.slice(0, 3).map((diff) => {
            const DiffIcon = diff.icon;
            return (
              <div
                key={diff.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <DiffIcon
                  className={`w-5 h-5 ${
                    diff.color === 'green'
                      ? 'text-green-600'
                      : diff.color === 'yellow'
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}
                />
                <div>
                  <span className="font-semibold text-gray-800">
                    {difficultyLabels[diff.id]}:
                  </span>{' '}
                  <span className="text-gray-600">
                    {difficultyDescriptions[diff.id]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
