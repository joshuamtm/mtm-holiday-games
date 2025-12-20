import { useState, useEffect, useRef } from 'react';
import { Check, X, Lightbulb, ChevronRight } from 'lucide-react';
import { validateAnswer } from '../../data/countries';

const questions = [
  { id: 'continent', label: 'Continent', points: 1, icon: '🌍' },
  { id: 'country', label: 'Country Name', points: 1, icon: '🏳️' },
  { id: 'capital', label: 'Capital City', points: 1, icon: '🏛️' },
  { id: 'language', label: 'Official Language', points: 1, icon: '🗣️' },
  { id: 'currency', label: 'Currency', points: 1, icon: '💰' },
  { id: 'bonus', label: 'Bonus Trivia', points: 1, icon: '⭐', isBonus: true },
];

export default function QuestionPanel({
  country,
  onQuestionComplete,
  onRoundComplete,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  roundScore,
  setRoundScore,
  usedHints,
  setUsedHints,
}) {
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect', null
  const [showHint, setShowHint] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const inputRef = useRef(null);

  const currentQuestion = questions[currentQuestionIndex];

  // Reset state when country changes
  useEffect(() => {
    setUserAnswer('');
    setFeedback(null);
    setShowHint(false);
    setAnsweredQuestions([]);
    setCurrentQuestionIndex(0);
    setRoundScore(0);
    setUsedHints([]);
  }, [country?.id]);

  // Focus input when question changes
  useEffect(() => {
    if (inputRef.current && feedback === null) {
      inputRef.current.focus();
    }
  }, [currentQuestionIndex, feedback]);

  const getCorrectAnswer = (questionId) => {
    switch (questionId) {
      case 'continent':
        return { answer: country.continent, aliases: [] };
      case 'country':
        return { answer: country.name, aliases: country.aliases };
      case 'capital':
        return { answer: country.capital, aliases: country.capitalAliases };
      case 'currency':
        return { answer: country.currency, aliases: country.currencyAliases };
      case 'language':
        return { answer: country.language, aliases: country.languageAliases };
      case 'bonus':
        return { answer: country.bonus, aliases: country.bonusAliases || [] };
      default:
        return { answer: '', aliases: [] };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userAnswer.trim() || feedback !== null) return;

    const { answer, aliases } = getCorrectAnswer(currentQuestion.id);
    const isCorrect = validateAnswer(userAnswer, answer, aliases);
    const hintUsed = usedHints.includes(currentQuestion.id);
    const pointsEarned = isCorrect && !hintUsed ? 1 : 0;

    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setAnsweredQuestions([
      ...answeredQuestions,
      {
        ...currentQuestion,
        userAnswer,
        correctAnswer: answer,
        isCorrect,
        hintUsed,
        pointsEarned,
      },
    ]);

    if (isCorrect) {
      setRoundScore(roundScore + pointsEarned);
      onQuestionComplete(currentQuestion.id, true, pointsEarned, currentQuestion.isBonus);
    } else {
      // Pass isBonus flag so bonus questions don't count as strikes
      onQuestionComplete(currentQuestion.id, false, 0, currentQuestion.isBonus);
    }
  };

  // Handle Enter key to advance to next question after feedback
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && feedback !== null) {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [feedback, currentQuestionIndex, roundScore, answeredQuestions]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer('');
      setFeedback(null);
      setShowHint(false);
    } else {
      // Round complete
      onRoundComplete(roundScore, answeredQuestions);
    }
  };

  const handleHint = () => {
    if (!usedHints.includes(currentQuestion.id)) {
      setUsedHints([...usedHints, currentQuestion.id]);
      setShowHint(true);
    }
  };

  const getHint = () => {
    if (!country?.hints) return 'No hint available';
    return country.hints[currentQuestion.id] || 'No hint available';
  };

  if (!country) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 text-center text-gray-500">
        Select a difficulty and start the game!
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Progress bar */}
      <div className="bg-gray-100 p-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="text-sm font-bold text-holiday-green">
            Round Score: {roundScore}/6
          </span>
        </div>
        <div className="flex gap-1">
          {questions.map((q, idx) => {
            const answered = answeredQuestions.find((a) => a.id === q.id);
            let bgColor = 'bg-gray-300';
            if (answered) {
              bgColor = answered.isCorrect ? 'bg-green-500' : 'bg-red-400';
            } else if (idx === currentQuestionIndex) {
              bgColor = 'bg-holiday-gold';
            }
            return (
              <div
                key={q.id}
                className={`flex-1 h-2 rounded-full ${bgColor} transition-all duration-300`}
              />
            );
          })}
        </div>
      </div>

      {/* Current question */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{currentQuestion.icon}</span>
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {currentQuestion.label}
              {currentQuestion.isBonus && (
                <span className="ml-2 text-sm font-normal text-purple-600">(No strike if wrong!)</span>
              )}
            </h3>
            <p className="text-sm text-gray-500">
              {currentQuestion.points} point{' '}
              {usedHints.includes(currentQuestion.id) && (
                <span className="text-orange-500">(hint used - 0 points)</span>
              )}
            </p>
          </div>
        </div>

        {/* Bonus trivia question text */}
        {currentQuestion.isBonus && country.bonusQuestion && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
            <p className="text-purple-800 font-medium">{country.bonusQuestion}</p>
          </div>
        )}

        {/* Hint section */}
        {showHint && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Hint:</p>
                <p className="text-sm text-yellow-700">{getHint()}</p>
              </div>
            </div>
          </div>
        )}

        {/* Answer form */}
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder={`Enter the ${currentQuestion.label.toLowerCase()}...`}
              disabled={feedback !== null}
              className={`flex-1 px-4 py-3 border-2 rounded-lg text-lg focus:outline-none focus:ring-2 transition-all ${
                feedback === 'correct'
                  ? 'border-green-500 bg-green-50'
                  : feedback === 'incorrect'
                  ? 'border-red-400 bg-red-50'
                  : 'border-gray-300 focus:border-holiday-green focus:ring-holiday-green/20'
              }`}
            />
            {feedback === null && (
              <button
                type="submit"
                disabled={!userAnswer.trim()}
                className="px-6 py-3 bg-holiday-green text-white font-semibold rounded-lg hover:bg-holiday-green-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Submit
              </button>
            )}
          </div>
        </form>

        {/* Feedback */}
        {feedback && (
          <div
            className={`p-4 rounded-lg mb-4 ${
              feedback === 'correct'
                ? 'bg-green-100 border border-green-300'
                : 'bg-red-100 border border-red-300'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {feedback === 'correct' ? (
                <>
                  <Check className="w-6 h-6 text-green-600" />
                  <span className="font-bold text-green-700">Correct!</span>
                  {!usedHints.includes(currentQuestion.id) && (
                    <span className="text-green-600">+1 point</span>
                  )}
                </>
              ) : (
                <>
                  <X className="w-6 h-6 text-red-600" />
                  <span className="font-bold text-red-700">Not quite!</span>
                </>
              )}
            </div>
            <p className="text-gray-700">
              The correct answer is:{' '}
              <span className="font-bold">
                {getCorrectAnswer(currentQuestion.id).answer}
              </span>
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          {feedback === null && !usedHints.includes(currentQuestion.id) && (
            <button
              onClick={handleHint}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 font-medium rounded-lg hover:bg-yellow-200 transition-colors"
            >
              <Lightbulb className="w-4 h-4" />
              Use Hint (-1 point)
            </button>
          )}

          {feedback !== null && (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 btn-holiday-gold rounded-lg font-semibold ml-auto"
            >
              {currentQuestionIndex < questions.length - 1 ? (
                <>
                  Next Question
                  <ChevronRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  See Results
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Previous answers summary */}
      {answeredQuestions.length > 0 && (
        <div className="border-t border-gray-100 p-4 bg-gray-50">
          <p className="text-sm font-medium text-gray-600 mb-2">This round:</p>
          <div className="flex flex-wrap gap-2">
            {answeredQuestions.map((q) => (
              <div
                key={q.id}
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  q.isCorrect
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                <span>{q.icon}</span>
                {q.isCorrect ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <X className="w-3 h-3" />
                )}
                {q.hintUsed && <Lightbulb className="w-3 h-3 text-yellow-600" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
