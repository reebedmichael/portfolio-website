import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import About from '../components/About';
import ParticleBackground from '../components/ParticleBackground';

const Home = () => (
  <div className="relative min-h-screen flex flex-col justify-center items-center bg-transparent">
    <ParticleBackground />
    <div className="z-10 w-full flex flex-col items-center justify-center pt-24 pb-12">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-extrabold text-blue-700 dark:text-blue-400 mb-4 drop-shadow-lg text-center"
      >
        Michael de Beer
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-2 text-center"
      >
        Software Engineer
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl text-center mb-8"
      >
        Building beautiful, modern web experiences with a passion for clean code and impactful design.
      </motion.p>
    </div>
    <About />
  </div>
);

export default Home; 