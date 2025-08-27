import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Bot, Code, Zap, Mic } from 'lucide-react';

const FloatingActionButtons = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const buttons = [
    {
      icon: Bot,
      label: 'AI Chat',
      color: 'from-blue-600 to-purple-600',
      onClick: () => {
        // Trigger AI chat widget
        const event = new CustomEvent('openAIChat');
        window.dispatchEvent(event);
      }
    },
    {
      icon: Code,
      label: 'Code Editor',
      color: 'from-green-600 to-emerald-600',
      onClick: () => {
        // Trigger code editor widget
        const event = new CustomEvent('openCodeEditor');
        window.dispatchEvent(event);
      }
    },
    {
      icon: Zap,
      label: 'Code Challenge',
      color: 'from-yellow-500 to-orange-500',
      onClick: () => {
        // Trigger code challenge game
        const event = new CustomEvent('openCodeChallenge');
        window.dispatchEvent(event);
      }
    },
    {
      icon: Mic,
      label: 'Voice Interaction',
      color: 'from-red-500 to-pink-500',
      onClick: () => {
        // Trigger voice interaction
        const event = new CustomEvent('openVoiceInteraction');
        window.dispatchEvent(event);
      }
    }
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50 hidden sm:block">
      {/* Main Plus Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isExpanded ? 45 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <Plus size={24} />
      </motion.button>

      {/* Expanded Buttons */}
      <AnimatePresence>
        {isExpanded && (
          <div className="absolute bottom-16 left-0 space-y-3">
            {buttons.map((button, index) => (
              <motion.button
                key={button.label}
                onClick={button.onClick}
                className={`w-14 h-14 bg-gradient-to-r ${button.color} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center`}
                initial={{ opacity: 0, scale: 0, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0, y: 10 }}
                transition={{ 
                  duration: 0.1, 
                  delay: index * 0.03,
                  type: "spring",
                  stiffness: 400
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={button.label}
              >
                <button.icon size={20} />
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingActionButtons;
