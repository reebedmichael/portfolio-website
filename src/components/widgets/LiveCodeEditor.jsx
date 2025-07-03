import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Copy, Download, Code, X } from 'lucide-react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

const LiveCodeEditor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentExample, setCurrentExample] = useState(0);

  const codeExamples = [
    {
      title: "React Counter",
      description: "A simple counter component with hooks",
      code: `function Counter() {
  const [count, setCount] = React.useState(0);
  
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Count: {count}</h2>
      <button 
        onClick={() => setCount(count + 1)}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Increment
      </button>
    </div>
  );
}

render(<Counter />);`
    },
    {
      title: "Animated Card",
      description: "A card with hover animations",
      code: `function AnimatedCard() {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '200px',
        height: '150px',
        backgroundColor: isHovered ? '#3b82f6' : '#1f2937',
        color: 'white',
        borderRadius: '12px',
        padding: '20px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isHovered ? '0 10px 25px rgba(59, 130, 246, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
    >
      <h3>Hover Me!</h3>
      <p>Watch the magic happen</p>
    </div>
  );
}

render(<AnimatedCard />);`
    },
    {
      title: "Todo List",
      description: "A simple todo list with add/remove functionality",
      code: `function TodoList() {
  const [todos, setTodos] = React.useState(['Learn React', 'Build Portfolio']);
  const [input, setInput] = React.useState('');
  
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput('');
    }
  };
  
  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };
  
  return (
    <div style={{ padding: '20px', maxWidth: '300px' }}>
      <h3>Todo List</h3>
      <div style={{ marginBottom: '10px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a todo..."
          style={{
            padding: '8px',
            marginRight: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <button 
          onClick={addTodo}
          style={{
            padding: '8px 16px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo, index) => (
          <li 
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px',
              margin: '4px 0',
              backgroundColor: '#f3f4f6',
              borderRadius: '4px'
            }}
          >
            {todo}
            <button
              onClick={() => removeTodo(index)}
              style={{
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 8px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

render(<TodoList />);`
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <>
      {/* Floating Code Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-50 p-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
          isOpen ? 'hidden' : 'block'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Code size={24} />
      </motion.button>

      {/* Code Editor Modal */}
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
              className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-6xl h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Code size={24} className="text-white" />
                  <div>
                    <h2 className="text-white font-semibold text-lg">Live Code Playground</h2>
                    <p className="text-green-100 text-sm">Try out some React code examples</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-green-100 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Example Selector */}
              <div className="bg-gray-100 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2 overflow-x-auto">
                  {codeExamples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentExample(index)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                        currentExample === index
                          ? 'bg-green-600 text-white'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                      }`}
                    >
                      {example.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Editor and Preview */}
              <div className="flex h-full">
                {/* Code Editor */}
                <div className="w-1/2 border-r border-gray-200 dark:border-gray-700">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {codeExamples[currentExample].title}
                      </h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => copyToClipboard(codeExamples[currentExample].code)}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                          title="Copy code"
                        >
                          <Copy size={16} />
                        </button>
                        <button
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                          title="Download code"
                        >
                          <Download size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {codeExamples[currentExample].description}
                    </p>
                  </div>
                  <div className="h-full overflow-auto">
                    <LiveProvider
                      code={codeExamples[currentExample].code}
                      noInline={false}
                      theme={{
                        plain: {
                          backgroundColor: '#1f2937',
                          color: '#f9fafb',
                        },
                        styles: []
                      }}
                    >
                      <LiveEditor
                        style={{
                          fontSize: '14px',
                          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                          height: '100%',
                          minHeight: '400px'
                        }}
                      />
                      <LiveError
                        style={{
                          backgroundColor: '#ef4444',
                          color: 'white',
                          padding: '8px',
                          fontSize: '14px'
                        }}
                      />
                    </LiveProvider>
                  </div>
                </div>

                {/* Live Preview */}
                <div className="w-1/2 bg-white dark:bg-gray-900">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                      <Play size={16} className="text-green-600" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">Live Preview</h3>
                    </div>
                  </div>
                  <div className="h-full overflow-auto p-4">
                    <LiveProvider
                      code={codeExamples[currentExample].code}
                      noInline={false}
                    >
                      <LivePreview
                        style={{
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      />
                    </LiveProvider>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveCodeEditor; 