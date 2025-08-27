import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Check, X, RotateCcw, Trophy, Star, Zap } from 'lucide-react';

const CodeChallengeGame = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);

  // Listen for custom event to open the widget
  useEffect(() => {
    const handleOpenEvent = () => {
      setIsOpen(true);
    };

    window.addEventListener('openCodeChallenge', handleOpenEvent);
    return () => window.removeEventListener('openCodeChallenge', handleOpenEvent);
  }, []);

  const challenges = [
    {
      type: 'regex',
      title: 'Email Validator',
      description: 'Create a regex pattern that matches valid email addresses',
      examples: [
        { input: 'user@example.com', shouldMatch: true },
        { input: 'invalid-email', shouldMatch: false },
        { input: 'test@domain.co.uk', shouldMatch: true },
        { input: '@domain.com', shouldMatch: false }
      ],
      hint: 'Think about the structure: username@domain.tld',
      solution: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
      points: 10
    },
    {
      type: 'logic',
      title: 'Array Sum',
      description: 'Find the sum of all even numbers in the array [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]',
      examples: [
        { input: 'Array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]', shouldMatch: false },
        { input: 'Even numbers: 2, 4, 6, 8, 10', shouldMatch: false },
        { input: 'Sum: 30', shouldMatch: true }
      ],
      hint: 'Add up 2 + 4 + 6 + 8 + 10',
      solution: '30',
      points: 5
    },
    {
      type: 'regex',
      title: 'Phone Number',
      description: 'Match US phone numbers in format (XXX) XXX-XXXX',
      examples: [
        { input: '(555) 123-4567', shouldMatch: true },
        { input: '555-123-4567', shouldMatch: false },
        { input: '(123) 456-7890', shouldMatch: true },
        { input: '1234567890', shouldMatch: false }
      ],
      hint: 'Use parentheses and hyphens in the pattern',
      solution: '^\\(\\d{3}\\) \\d{3}-\\d{4}$',
      points: 15
    },
    {
      type: 'logic',
      title: 'Palindrome Check',
      description: 'Is "racecar" a palindrome? Answer with "yes" or "no"',
      examples: [
        { input: 'racecar', shouldMatch: false },
        { input: 'yes', shouldMatch: true }
      ],
      hint: 'Read it backwards: racecar',
      solution: 'yes',
      points: 5
    },
    {
      type: 'regex',
      title: 'URL Validator',
      description: 'Match URLs starting with http:// or https://',
      examples: [
        { input: 'https://example.com', shouldMatch: true },
        { input: 'http://test.org', shouldMatch: true },
        { input: 'ftp://server.com', shouldMatch: false },
        { input: 'example.com', shouldMatch: false }
      ],
      hint: 'Start with http:// or https:// followed by domain',
      solution: '^https?://[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
      points: 12
    }
  ];

  const currentChallenge = challenges[currentLevel];

  const checkAnswer = () => {
    if (currentChallenge.type === 'regex') {
      try {
        const regex = new RegExp(userAnswer);
        const isCorrectAnswer = currentChallenge.examples.every(example => {
          const matches = regex.test(example.input);
          return matches === example.shouldMatch;
        });
        setIsCorrect(isCorrectAnswer);
        
        if (isCorrectAnswer) {
          setScore(prev => prev + currentChallenge.points);
          setStreak(prev => prev + 1);
          setTimeout(() => {
            if (currentLevel < challenges.length - 1) {
              setCurrentLevel(prev => prev + 1);
              setUserAnswer('');
              setIsCorrect(null);
              setShowHint(false);
            } else {
              setIsPlaying(false);
            }
          }, 1500);
        } else {
          setStreak(0);
        }
      } catch {
        setIsCorrect(false);
        setStreak(0);
      }
    } else {
      const isCorrectAnswer = userAnswer.toLowerCase().trim() === currentChallenge.solution.toLowerCase();
      setIsCorrect(isCorrectAnswer);
      
      if (isCorrectAnswer) {
        setScore(prev => prev + currentChallenge.points);
        setStreak(prev => prev + 1);
        setTimeout(() => {
          if (currentLevel < challenges.length - 1) {
            setCurrentLevel(prev => prev + 1);
            setUserAnswer('');
            setIsCorrect(null);
            setShowHint(false);
          } else {
            setIsPlaying(false);
          }
        }, 1500);
      } else {
        setStreak(0);
      }
    }
  };

  const startGame = () => {
    setIsPlaying(true);
    setCurrentLevel(0);
    setScore(0);
    setStreak(0);
    setUserAnswer('');
    setIsCorrect(null);
    setShowHint(false);
    setTimeLeft(60);
  };

  const resetGame = () => {
    setIsPlaying(false);
    setCurrentLevel(0);
    setScore(0);
    setStreak(0);
    setUserAnswer('');
    setIsCorrect(null);
    setShowHint(false);
    setTimeLeft(60);
  };

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Floating Game Button - Hidden on mobile */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 p-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hidden ${
          isOpen ? 'hidden' : 'block'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Zap size={24} />
      </motion.button>

      {/* Game Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Zap size={24} className="text-white" />
                  <div>
                    <h2 className="text-white font-semibold text-lg">Code Challenge</h2>
                    <p className="text-yellow-100 text-sm">Test your coding skills!</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-yellow-100 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Game Content */}
              <div className="p-6">
                {!isPlaying ? (
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mx-auto mb-4 flex items-center justify-center"
                    >
                      <Trophy size={32} className="text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Ready to Code?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Solve regex puzzles and logic problems to earn points!
                    </p>
                    <button
                      onClick={startGame}
                      className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 flex items-center space-x-2 mx-auto"
                    >
                      <Play size={20} />
                      <span>Start Challenge</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Game Stats */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{score}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{streak}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Streak</div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-red-600">{formatTime(timeLeft)}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Time Left</div>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentLevel + 1) / challenges.length) * 100}%` }}
                      />
                    </div>

                    {/* Challenge */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Level {currentLevel + 1} of {challenges.length}
                        </span>
                        <span className="text-sm text-yellow-600 font-medium">
                          {currentChallenge.points} pts
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {currentChallenge.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {currentChallenge.description}
                      </p>

                      {/* Examples */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Examples:</h4>
                        <div className="space-y-1">
                          {currentChallenge.examples.map((example, index) => (
                            <div key={index} className="text-sm">
                              <span className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                                {example.input}
                              </span>
                              <span className={`ml-2 ${example.shouldMatch ? 'text-green-600' : 'text-red-600'}`}>
                                {example.shouldMatch ? '✓' : '✗'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Input */}
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                          placeholder={currentChallenge.type === 'regex' ? 'Enter regex pattern...' : 'Enter your answer...'}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
                        />
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={checkAnswer}
                            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                          >
                            <Check size={16} />
                            <span>Submit</span>
                          </button>
                          <button
                            onClick={() => setShowHint(!showHint)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Hint
                          </button>
                        </div>

                        {/* Hint */}
                        {showHint && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                          >
                            <p className="text-sm text-blue-800 dark:text-blue-200">
                              💡 {currentChallenge.hint}
                            </p>
                          </motion.div>
                        )}

                        {/* Result */}
                        <AnimatePresence>
                          {isCorrect !== null && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className={`p-3 rounded-lg flex items-center space-x-2 ${
                                isCorrect 
                                  ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
                                  : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                              }`}
                            >
                              {isCorrect ? <Check size={16} /> : <X size={16} />}
                              <span className="text-sm font-medium">
                                {isCorrect ? 'Correct! Well done!' : 'Incorrect. Try again!'}
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Game Controls */}
                    <div className="flex justify-center">
                      <button
                        onClick={resetGame}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                      >
                        <RotateCcw size={16} />
                        <span>Reset Game</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CodeChallengeGame; 