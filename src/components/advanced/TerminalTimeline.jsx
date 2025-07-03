import { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ChevronRight, Folder, FileText, Calendar, MapPin } from 'lucide-react';

const TerminalTimeline = () => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentOutput, setCurrentOutput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const timelineData = [
    {
      year: '2024',
      title: 'Senior Full-Stack Developer',
      company: 'Tech Innovations Inc.',
      location: 'San Francisco, CA',
      description: 'Leading development of scalable web applications using React, Node.js, and cloud technologies. Mentoring junior developers and implementing best practices.',
      technologies: ['React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL'],
      type: 'job'
    },
    {
      year: '2023',
      title: 'Full-Stack Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      description: 'Built and maintained multiple web applications. Collaborated with cross-functional teams to deliver high-quality products.',
      technologies: ['React', 'Python', 'Django', 'MongoDB', 'Heroku'],
      type: 'job'
    },
    {
      year: '2022',
      title: 'Frontend Developer',
      company: 'Digital Agency',
      location: 'New York, NY',
      description: 'Developed responsive web applications and improved user experience. Worked with various clients and technologies.',
      technologies: ['JavaScript', 'React', 'CSS3', 'WordPress', 'Figma'],
      type: 'job'
    },
    {
      year: '2021',
      title: 'Computer Science Degree',
      company: 'University of Technology',
      location: 'Graduation',
      description: 'Bachelor of Science in Computer Science with focus on software engineering and web development.',
      technologies: ['Java', 'Python', 'Data Structures', 'Algorithms', 'Web Development'],
      type: 'education'
    }
  ];

  const commands = {
    help: {
      description: 'Show available commands',
      output: `Available commands:
  help          - Show this help message
  ls            - List timeline entries
  cat [year]    - Show details for specific year
  clear         - Clear terminal
  about         - Show about information
  skills        - Show technical skills
  contact       - Show contact information`
    },
    ls: {
      description: 'List timeline entries',
      output: timelineData.map(item => `${item.year}  ${item.type === 'job' ? '💼' : '🎓'}  ${item.title} at ${item.company}`).join('\n')
    },
    clear: {
      description: 'Clear terminal',
      output: '',
      action: () => {
        setCommandHistory([]);
        setCurrentOutput('');
      }
    },
    about: {
      description: 'Show about information',
      output: `Michael de Beer - Full-Stack Developer

Passionate about creating innovative web solutions and 
delivering exceptional user experiences. Always learning 
and exploring new technologies to stay ahead of the curve.

Current focus: React, Node.js, Cloud Architecture, DevOps`
    },
    skills: {
      description: 'Show technical skills',
      output: `Frontend: React, Next.js, TypeScript, TailwindCSS, Framer Motion
Backend:  Node.js, Express, Python, Django, FastAPI
Database: PostgreSQL, MongoDB, Redis
Cloud:    AWS, Docker, Kubernetes, CI/CD
Tools:    Git, VS Code, Figma, Postman`
    },
    contact: {
      description: 'Show contact information',
      output: `📧 Email: michael@example.com
💼 LinkedIn: linkedin.com/in/michaeldebeer
🐙 GitHub: github.com/michaeldebeer
🌐 Website: michaeldebeer.dev`
    }
  };

  const executeCommand = async (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const [command, ...args] = trimmedCmd.split(' ');

    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    let output = '';

    if (commands[command]) {
      if (command === 'cat' && args[0]) {
        const year = args[0];
        const entry = timelineData.find(item => item.year === year);
        if (entry) {
          output = `${entry.year} - ${entry.title}
Company: ${entry.company}
Location: ${entry.location}
Description: ${entry.description}
Technologies: ${entry.technologies.join(', ')}`;
        } else {
          output = `Error: No entry found for year ${year}`;
        }
      } else {
        output = commands[command].output;
        if (commands[command].action) {
          commands[command].action();
        }
      }
    } else if (trimmedCmd) {
      output = `Command not found: ${command}. Type 'help' for available commands.`;
    }

    setCurrentOutput(output);
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const newHistory = [...commandHistory, { command: currentCommand, output: currentOutput }];
      setCommandHistory(newHistory);
      executeCommand(currentCommand);
      setCurrentCommand('');
    }
  };

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Auto-focus input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory, currentOutput]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden"
    >
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex items-center space-x-2 text-gray-300">
            <Terminal size={16} />
            <span className="text-sm font-mono">michael@portfolio:~</span>
          </div>
        </div>
        <div className="text-gray-400 text-sm">
          Timeline Terminal
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="h-96 overflow-y-auto p-4 font-mono text-sm text-green-400 bg-gray-900"
      >
        {/* Welcome Message */}
        <div className="mb-4">
          <div className="text-blue-400">Welcome to Michael's Career Timeline Terminal</div>
          <div className="text-gray-400 text-xs mt-1">Type 'help' to see available commands</div>
        </div>

        {/* Command History */}
        <AnimatePresence>
          {commandHistory.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-2"
            >
              <div className="flex items-center space-x-2">
                <span className="text-blue-400">michael@portfolio:~$</span>
                <span>{entry.command}</span>
              </div>
              {entry.output && (
                <div className="mt-1 text-gray-300 whitespace-pre-line">
                  {entry.output}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Current Output */}
        {currentOutput && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-2 text-gray-300 whitespace-pre-line"
          >
            {currentOutput}
          </motion.div>
        )}

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-1 text-gray-400"
          >
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span>Processing...</span>
          </motion.div>
        )}

        {/* Current Input Line */}
        <div className="flex items-center space-x-2">
          <span className="text-blue-400">michael@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent text-green-400 outline-none"
            placeholder=""
          />
          <span className={`w-2 h-4 bg-green-400 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 px-4 py-3 border-t border-gray-700">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setCurrentCommand('help');
              handleKeyPress({ key: 'Enter' });
            }}
            className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
          >
            help
          </button>
          <button
            onClick={() => {
              setCurrentCommand('ls');
              handleKeyPress({ key: 'Enter' });
            }}
            className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
          >
            ls
          </button>
          <button
            onClick={() => {
              setCurrentCommand('about');
              handleKeyPress({ key: 'Enter' });
            }}
            className="px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700 transition-colors"
          >
            about
          </button>
          <button
            onClick={() => {
              setCurrentCommand('skills');
              handleKeyPress({ key: 'Enter' });
            }}
            className="px-3 py-1 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700 transition-colors"
          >
            skills
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TerminalTimeline; 