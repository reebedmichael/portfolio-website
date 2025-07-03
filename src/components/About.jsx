import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Heart, Coffee, BookOpen, Target, Award } from 'lucide-react';

const interests = [
  { name: 'Swimming', icon: '🏊‍♂️', description: 'Competitive swimming and water sports' },
  { name: 'Climbing', icon: '🧗‍♂️', description: 'Rock climbing and bouldering' },
  { name: 'Hiking', icon: '🥾', description: 'Mountain trails and outdoor adventures' },
  { name: 'Kite Surfing', icon: '🏄‍♂️', description: 'Wind-powered water sports' },
  { name: 'Skiing', icon: '⛷️', description: 'Alpine skiing and snowboarding' },
  { name: 'Mountain Biking', icon: '🚴‍♂️', description: 'Trail riding and endurance cycling' },
  { name: 'Reading', icon: '📚', description: 'Tech books and sci-fi novels' },
  { name: 'Formula 1', icon: '🏎️', description: 'Racing and automotive engineering' }
];

const funFacts = [
  { icon: Coffee, text: 'Can code for 12+ hours straight with coffee', color: 'from-orange-500 to-red-500' },
  { icon: Target, text: 'Built 6+ production applications in 2 years', color: 'from-green-500 to-emerald-500' },
  { icon: Award, text: 'Final year BSc Computer Science student', color: 'from-blue-500 to-purple-500' },
  { icon: Heart, text: 'Passionate about solving real-world problems', color: 'from-pink-500 to-rose-500' }
];

export default function About() {
  const [ref, isInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="space-y-16">
      {/* Section Header */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-4"
        >
          <BookOpen className="w-4 h-4" />
          <span>About Me</span>
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Who I Am
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A passionate software developer with a love for creating impactful digital experiences
        </p>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Bio Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ y: -5 }}
          className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
        >
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Michael de Beer
              </h3>
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
                Software Developer
              </span>
            </div>

            <div className="flex items-center justify-center">
              <span className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
                <MapPin className="w-4 h-4" />
                Centurion, Pretoria, South Africa
              </span>
            </div>

            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                I'm a motivated and detail-oriented final-year BSc Computer Science student 
                specializing in software engineering, cloud computing, and robust application development.
              </p>
              <p>
                With over 2 years of experience building modern web applications, I've developed 
                a passion for creating user-focused solutions that solve real-world problems. 
                I specialize in React, TypeScript, and cloud technologies.
              </p>
              <p>
                When I'm not coding, you'll find me exploring the outdoors, reading tech books, 
                or watching Formula 1 races. I believe in continuous learning and pushing the 
                boundaries of what's possible with technology.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Fun Facts About Me
          </h3>
          
          <div className="grid gap-4">
            {funFacts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ x: 5 }}
                className="flex items-center space-x-4 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
              >
                <div className={`p-3 rounded-xl bg-gradient-to-r ${fact.color}`}>
                  <fact.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {fact.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Interests Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="text-center"
      >
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Personal Interests & Hobbies
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {interests.map((interest, index) => (
            <motion.div
              key={interest.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {interest.icon}
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                {interest.name}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {interest.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 