import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import WorldMap from '../components/geografacts/WorldMap';
import QuestionPanel from '../components/geografacts/QuestionPanel';
import ScoreBoard from '../components/geografacts/ScoreBoard';
import GameSetup from '../components/geografacts/GameSetup';
import RoundResults from '../components/geografacts/RoundResults';
import GameOver from '../components/geografacts/GameOver';
import { getCountriesByDifficulty, countries } from '../data/countries';

const TARGET_SCORE = 20;
const MAX_STRIKES = 5;

export default function GeografactsGame() {
  // Game state
  const [gameState, setGameState] = useState('setup'); // 'setup', 'playing', 'round-results', 'game-over'
  const [gameMode, setGameMode] = useState(null); // 'head-to-head', 'coop'
  const [difficulty, setDifficulty] = useState(null);

  // Scores and progress
  const [scores, setScores] = useState({ team1: 0, team2: 0, coop: 0 });
  const [currentTeam, setCurrentTeam] = useState(1);
  const [strikes, setStrikes] = useState(0);
  const [roundNumber, setRoundNumber] = useState(1);

  // Current round state
  const [currentCountry, setCurrentCountry] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [roundScore, setRoundScore] = useState(0);
  const [usedHints, setUsedHints] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  // History - track by ID to avoid repeats
  const [playedCountryIds, setPlayedCountryIds] = useState(new Set());
  const [countriesPlayed, setCountriesPlayed] = useState([]);
  const [winner, setWinner] = useState(null);

  // Get a random country that hasn't been played yet
  const getNextCountry = useCallback((playedIds = playedCountryIds) => {
    // Get the pool based on difficulty
    let pool;
    if (difficulty === 'mixed') {
      pool = [...countries];
    } else {
      pool = getCountriesByDifficulty(difficulty);
    }

    // Filter out already played countries
    let available = pool.filter(c => !playedIds.has(c.id));

    // If all countries played, reset the pool (but keep tracking for display)
    if (available.length === 0) {
      available = pool;
    }

    // Shuffle and pick a random one
    const shuffled = available.sort(() => Math.random() - 0.5);
    return shuffled[0];
  }, [difficulty, playedCountryIds]);

  // Start a new game
  const handleStartGame = (mode, diff) => {
    setGameMode(mode);
    setDifficulty(diff);
    setScores({ team1: 0, team2: 0, coop: 0 });
    setCurrentTeam(1);
    setStrikes(0);
    setRoundNumber(1);
    setPlayedCountryIds(new Set());
    setCountriesPlayed([]);
    setWinner(null);

    // Get first country from shuffled pool
    let pool;
    if (diff === 'mixed') {
      pool = [...countries];
    } else {
      pool = getCountriesByDifficulty(diff);
    }
    const shuffled = pool.sort(() => Math.random() - 0.5);
    const firstCountry = shuffled[0];

    setCurrentCountry(firstCountry);
    setPlayedCountryIds(new Set([firstCountry.id]));
    setCurrentQuestionIndex(0);
    setRoundScore(0);
    setUsedHints([]);
    setAnsweredQuestions([]);
    setGameState('playing');
  };

  // Handle question completion
  const handleQuestionComplete = (questionId, isCorrect, points, isBonus = false) => {
    // Track incorrect answers for co-op mode (bonus questions don't count as strikes)
    if (!isCorrect && gameMode === 'coop' && !isBonus) {
      const newStrikes = strikes + 1;
      setStrikes(newStrikes);

      // Check if game over
      if (newStrikes >= MAX_STRIKES) {
        // Don't end immediately, let the round finish
      }
    }
  };

  // Handle round completion
  const handleRoundComplete = (score, questions) => {
    setAnsweredQuestions(questions);
    setCountriesPlayed([...countriesPlayed, currentCountry.name]);

    // Update scores
    if (gameMode === 'head-to-head') {
      if (currentTeam === 1) {
        const newScore = scores.team1 + score;
        setScores({ ...scores, team1: newScore });

        // Check for win
        if (newScore >= TARGET_SCORE) {
          setWinner(1);
          setGameState('game-over');
          return;
        }
      } else {
        const newScore = scores.team2 + score;
        setScores({ ...scores, team2: newScore });

        // Check for win
        if (newScore >= TARGET_SCORE) {
          setWinner(2);
          setGameState('game-over');
          return;
        }
      }
    } else {
      // Co-op mode
      const newScore = scores.coop + score;
      setScores({ ...scores, coop: newScore });

      // Check for win
      if (newScore >= TARGET_SCORE) {
        setWinner('coop');
        setGameState('game-over');
        return;
      }

      // Check for loss (ran out of strikes)
      if (strikes >= MAX_STRIKES) {
        setGameState('game-over');
        return;
      }
    }

    // Show round results
    setGameState('round-results');
  };

  // Start next round
  const handleNextRound = () => {
    // Switch teams in head-to-head
    if (gameMode === 'head-to-head') {
      setCurrentTeam(currentTeam === 1 ? 2 : 1);
    }

    setRoundNumber(roundNumber + 1);

    // Get new country that hasn't been played
    const newPlayedIds = new Set(playedCountryIds);
    const nextCountry = getNextCountry(newPlayedIds);
    newPlayedIds.add(nextCountry.id);

    setPlayedCountryIds(newPlayedIds);
    setCurrentCountry(nextCountry);
    setCurrentQuestionIndex(0);
    setRoundScore(0);
    setUsedHints([]);
    setAnsweredQuestions([]);
    setGameState('playing');
  };

  // End game early
  const handleEndGame = () => {
    // Determine winner for head-to-head
    if (gameMode === 'head-to-head') {
      if (scores.team1 > scores.team2) {
        setWinner(1);
      } else if (scores.team2 > scores.team1) {
        setWinner(2);
      } else {
        setWinner(0); // Tie
      }
    }
    setGameState('game-over');
  };

  // Play again
  const handlePlayAgain = () => {
    setGameState('setup');
    setGameMode(null);
    setDifficulty(null);
    setCurrentCountry(null);
    setPlayedCountryIds(new Set());
    setCountriesPlayed([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-holiday-snow to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Games</span>
          </Link>
          <h1 className="text-xl font-bold text-holiday-pine flex items-center gap-2">
            🌍 Geografacts
          </h1>
          <Link
            to="/"
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Home className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Setup screen */}
        {gameState === 'setup' && (
          <GameSetup onStartGame={handleStartGame} />
        )}

        {/* Playing screen */}
        {gameState === 'playing' && currentCountry && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left column - Map (sticky on desktop) */}
            <div className="lg:sticky lg:top-20 lg:self-start space-y-4">
              {/* World Map */}
              <WorldMap
                highlightedCountry={currentCountry.id}
                showAllCountries={true}
              />

              {/* Score and Difficulty row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Mini Scoreboard */}
                <div className="bg-white rounded-xl shadow-lg p-4">
                  <div className="text-xs text-gray-500 mb-1">
                    {gameMode === 'head-to-head' ? `Team ${currentTeam}` : 'Score'}
                  </div>
                  <div className="text-2xl font-bold text-holiday-green">
                    {gameMode === 'head-to-head'
                      ? currentTeam === 1 ? scores.team1 : scores.team2
                      : scores.coop}
                    <span className="text-sm text-gray-400 font-normal">/{TARGET_SCORE}</span>
                  </div>
                  {gameMode === 'coop' && (
                    <div className="text-xs text-gray-500 mt-1">
                      Strikes: {strikes}/{MAX_STRIKES}
                    </div>
                  )}
                </div>

                {/* Difficulty indicator */}
                <div className="bg-white rounded-xl shadow-lg p-4">
                  <div className="text-xs text-gray-500 mb-1">Difficulty</div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      currentCountry.difficulty === 'easy'
                        ? 'bg-green-100 text-green-700'
                        : currentCountry.difficulty === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {currentCountry.difficulty.charAt(0).toUpperCase() +
                      currentCountry.difficulty.slice(1)}
                  </span>
                  <div className="text-xs text-gray-500 mt-1">Round {roundNumber}</div>
                </div>
              </div>
            </div>

            {/* Right column - Questions */}
            <div>
              <QuestionPanel
                country={currentCountry}
                onQuestionComplete={handleQuestionComplete}
                onRoundComplete={handleRoundComplete}
                currentQuestionIndex={currentQuestionIndex}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                roundScore={roundScore}
                setRoundScore={setRoundScore}
                usedHints={usedHints}
                setUsedHints={setUsedHints}
              />
            </div>
          </div>
        )}

        {/* Round results screen */}
        {gameState === 'round-results' && currentCountry && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <ScoreBoard
                gameMode={gameMode}
                scores={scores}
                targetScore={TARGET_SCORE}
                maxStrikes={MAX_STRIKES}
                strikes={strikes}
                currentTeam={currentTeam}
                roundNumber={roundNumber}
              />
            </div>
            <div className="lg:col-span-2">
              <RoundResults
                country={currentCountry}
                roundScore={roundScore}
                answeredQuestions={answeredQuestions}
                onNextRound={handleNextRound}
                onEndGame={handleEndGame}
                roundNumber={roundNumber}
                gameMode={gameMode}
                currentTeam={currentTeam}
              />
            </div>
          </div>
        )}

        {/* Game over screen */}
        {gameState === 'game-over' && (
          <GameOver
            gameMode={gameMode}
            scores={scores}
            targetScore={TARGET_SCORE}
            winner={winner}
            onPlayAgain={handlePlayAgain}
            totalRounds={roundNumber}
            countriesPlayed={countriesPlayed}
          />
        )}
      </div>
    </div>
  );
}
