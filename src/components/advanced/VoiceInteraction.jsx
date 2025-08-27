import { useState, useEffect, useCallback, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, X, Settings, Command } from 'lucide-react';

const VoiceInteraction = () => {
  const [isListening, setIsListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [lastCommand, setLastCommand] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Listen for custom event to open the widget
  useEffect(() => {
    const handleOpenEvent = () => {
      setIsOpen(true);
    };

    window.addEventListener('openVoiceInteraction', handleOpenEvent);
    return () => window.removeEventListener('openVoiceInteraction', handleOpenEvent);
  }, []);

  const commands = useMemo(() => ({
    'go to about': () => {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      return 'Navigating to About section';
    },
    'go to projects': () => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      return 'Navigating to Projects section';
    },
    'go to skills': () => {
      document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
      return 'Navigating to Skills section';
    },
    'go to contact': () => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      return 'Navigating to Contact section';
    },
    'scroll to top': () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return 'Scrolling to top';
    },
    'scroll to bottom': () => {
      window.scrollTo({ bottom: 0, behavior: 'smooth' });
      return 'Scrolling to bottom';
    },
    'what is your name': () => {
      return 'My name is Michael de Beer, I am a full-stack developer';
    },
    'what do you do': () => {
      return 'I am a senior full-stack developer specializing in React, Node.js, and cloud technologies. I build scalable web applications and love creating innovative solutions';
    },
    'what are your skills': () => {
      return 'My main skills include React, Next.js, Node.js, Python, AWS, Docker, and many more. You can check out my skills section for more details';
    },
    'show projects': () => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      return 'Showing my projects';
    },
    'contact me': () => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      return 'Taking you to the contact section';
    },
    'toggle theme': () => {
      const html = document.documentElement;
      const isDark = html.classList.contains('dark');
      if (isDark) {
        html.classList.remove('dark');
      } else {
        html.classList.add('dark');
      }
      return `Switched to ${isDark ? 'light' : 'dark'} theme`;
    },
    'help': () => {
      return 'Available commands: go to about, go to projects, go to skills, go to contact, scroll to top, scroll to bottom, what is your name, what do you do, what are your skills, show projects, contact me, toggle theme, help';
    }
  }), []);

  const processCommand = useCallback(async (command) => {
    setIsProcessing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let response = 'Sorry, I did not understand that command. Try saying "help" for available commands.';
    
    // Check for exact matches first
    if (commands[command]) {
      response = commands[command]();
    } else {
      // Check for partial matches
      for (const [key, func] of Object.entries(commands)) {
        if (command.includes(key) || key.includes(command)) {
          response = func();
          break;
        }
      }
    }
    
    setLastCommand(command);
    speakResponse(response);
    setIsProcessing(false);
  }, [commands]);

  const speakResponse = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    // Check if speech recognition is supported
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onstart = () => {
        setIsListening(true);
        setTranscript('');
      };
      
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setTranscript(transcript);
        processCommand(transcript);
      };
      
      recognitionInstance.onerror = (event) => {
        // Production-safe error handling
        if (import.meta.env.DEV) {
          console.error('Speech recognition error:', event.error);
        }
        setIsListening(false);
        setIsProcessing(false);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
      setIsSupported(true);
    }
  }, [processCommand]);

  const startListening = () => {
    if (recognition && isSupported) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <>
      {/* Floating Voice Button - Hidden on mobile */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed top-6 left-6 z-50 p-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hidden ${
          isOpen ? 'hidden' : 'block'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Mic size={24} />
      </motion.button>

      {/* Voice Interaction Modal */}
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
              className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-red-500 to-pink-500 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mic size={24} className="text-white" />
                  <div>
                    <h2 className="text-white font-semibold text-lg">Voice Assistant</h2>
                    <p className="text-red-100 text-sm">Speak to navigate and interact</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-red-100 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {!isSupported ? (
                  <div className="text-center">
                    <MicOff size={48} className="text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Voice Not Supported
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Your browser doesn't support speech recognition. Try using Chrome or Edge.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Voice Status */}
                    <div className="text-center">
                      <motion.div
                        animate={isListening ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 1, repeat: isListening ? Infinity : 0 }}
                        className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center ${
                          isListening 
                            ? 'bg-red-500 animate-pulse' 
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        {isListening ? (
                          <Mic size={32} className="text-white" />
                        ) : (
                          <MicOff size={32} className="text-gray-400" />
                        )}
                      </motion.div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {isListening ? 'Listening...' : 'Voice Assistant Ready'}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {isListening ? 'Speak now!' : 'Click the microphone to start'}
                      </p>
                    </div>

                    {/* Controls */}
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={toggleListening}
                        disabled={isProcessing}
                        className={`p-4 rounded-full transition-all duration-300 ${
                          isListening
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {isListening ? <MicOff size={24} /> : <Mic size={24} />}
                      </button>
                      
                      <button
                        onClick={() => speakResponse('Voice assistant activated')}
                        className="p-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                      >
                        <Volume2 size={24} />
                      </button>
                    </div>

                    {/* Transcript */}
                    {transcript && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
                      >
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          You said:
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 italic">
                          "{transcript}"
                        </p>
                      </motion.div>
                    )}

                    {/* Processing Indicator */}
                    {isProcessing && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center space-x-2 text-blue-600"
                      >
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm">Processing...</span>
                      </motion.div>
                    )}

                    {/* Last Command */}
                    {lastCommand && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4"
                      >
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                          Last Command:
                        </h4>
                        <p className="text-blue-800 dark:text-blue-200 text-sm">
                          "{lastCommand}"
                        </p>
                      </motion.div>
                    )}

                    {/* Quick Commands */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <Command size={16} className="mr-2" />
                        Quick Commands
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.keys(commands).slice(0, 8).map((command) => (
                          <button
                            key={command}
                            onClick={() => processCommand(command)}
                            className="px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-left"
                          >
                            {command}
                          </button>
                        ))}
                      </div>
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

export default VoiceInteraction; 