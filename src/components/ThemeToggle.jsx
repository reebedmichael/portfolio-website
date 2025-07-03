// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ dark, setDark }) {
  return (
    <motion.button
      onClick={() => setDark(!dark)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: dark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        {dark ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-gray-700" />
        )}
      </motion.div>
    </motion.button>
  );
} 