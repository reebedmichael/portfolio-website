import { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, X, Minimize2, Maximize2 } from 'lucide-react';

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hey! I'm your AI assistant. Ask me anything about Michael's skills, projects, or experience! 🚀",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // AI Response Generator (simulated)
  const generateAIResponse = async (userMessage) => {
    setIsTyping(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const responses = {
      skills: "Michael is a full-stack developer with expertise in React, Node.js, Python, and cloud technologies. He's particularly strong in frontend development and loves working with modern frameworks! 💻",
      projects: "Michael has built several impressive projects including this portfolio, a Disney-themed game, and various web applications. He's always working on something new and exciting! 🎯",
      experience: "Michael has experience in both startup and enterprise environments, with a focus on scalable web applications and user experience design. He's passionate about clean code and best practices! 🏢",
      contact: "You can reach Michael through LinkedIn, GitHub, or the contact form on this site. He's always open to new opportunities and collaborations! 📧",
      default: "That's an interesting question! Michael is a passionate developer who loves creating innovative solutions. Feel free to ask about his specific skills, projects, or experience! 🤔"
    };

    const lowerMessage = userMessage.toLowerCase();
    let response = responses.default;

    if (lowerMessage.includes('skill') || lowerMessage.includes('tech') || lowerMessage.includes('technology')) {
      response = responses.skills;
    } else if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('build')) {
      response = responses.projects;
    } else if (lowerMessage.includes('experience') || lowerMessage.includes('job') || lowerMessage.includes('career')) {
      response = responses.experience;
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
      response = responses.contact;
    }

    setIsTyping(false);
    return response;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    const aiResponse = await generateAIResponse(inputValue);
    
    const botMessage = {
      id: Date.now() + 1,
      type: 'bot',
      content: aiResponse,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
          isOpen ? 'hidden' : 'block'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Bot size={24} />
      </motion.button>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-gray-900 border border-gray-700 rounded-lg shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot size={20} className="text-white" />
                <span className="text-white font-semibold">AI Assistant</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-800">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs p-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-700 text-gray-100'
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          {message.type === 'user' ? (
                            <User size={14} />
                          ) : (
                            <Bot size={14} />
                          )}
                          <span className="text-xs opacity-70">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-700 text-gray-100 p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Bot size={14} />
                          <span className="text-xs opacity-70">typing...</span>
                        </div>
                        <div className="flex space-x-1 mt-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-gray-900 border-t border-gray-700">
                  <div className="flex space-x-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about Michael..."
                      className="flex-1 bg-gray-800 text-gray-100 px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatWidget; 