import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import WorldMap from '../components/geografacts/WorldMap';
import QuestionPanel from '../components/geografacts/QuestionPanel';
import ScoreBoard from '../components/geografacts/ScoreBoard';
import GameSetup from '../components/geografacts/GameSetup';
import RoundResults from '../components/geografacts/RoundResults';
import GameOver from '../components/geografacts/GameOver';
import { getRandomCountry, countries } from '../data/countries';

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

  // History
  const [countriesPlayed, setCountriesPlayed] = useState([]);
  const [winner, setWinner] = useState(null);

  // Get a random country based on difficulty
  const getNextCountry = useCallback(() => {
    if (difficulty === 'mixed') {
      return getRandomCountry();
    }
    return getRandomCountry(difficulty);
  }, [difficulty]);

  // Start a new game
  const handleStartGame = (mode, diff) => {
    setGameMode(mode);
    setDifficulty(diff);
    setScores({ team1: 0, team2: 0, coop: 0 });
    setCurrentTeam(1);
    setStrikes(0);
    setRoundNumber(1);
    setCountriesPlayed([]);
    setWinner(null);

    // Get first country
    const firstCountry =
      diff === 'mixed' ? getRandomCountry() : getRandomCountry(diff);
    setCurrentCountry(firstCountry);
    setCurrentQuestionIndex(0);
    setRoundScore(0);
    setUsedHints([]);
    setAnsweredQuestions([]);
    setGameState('playing');
  };

  // Handle question completion
  const handleQuestionComplete = (questionId, isCorrect, points) => {
    // Track incorrect answers for co-op mode
    if (!isCorrect && gameMode === 'coop') {
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

    // Get new country
    const nextCountry = getNextCountry();
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
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left column - Map and Score */}
            <div className="lg:col-span-1 space-y-6">
              <ScoreBoard
                gameMode={gameMode}
                scores={scores}
                targetScore={TARGET_SCORE}
                maxStrikes={MAX_STRIKES}
                strikes={strikes}
                currentTeam={currentTeam}
                roundNumber={roundNumber}
              />

              {/* Difficulty indicator */}
              <div className="bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Difficulty</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
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
                </div>
              </div>
            </div>

            {/* Right column - Map and Questions */}
            <div className="lg:col-span-2 space-y-6">
              {/* World Map */}
              <WorldMap
                highlightedCountry={currentCountry.id}
                showAllCountries={true}
              />

              {/* Question Panel */}
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
