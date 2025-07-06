// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, ExternalLink, GraduationCap, Briefcase } from 'lucide-react';
import { useExperience } from '../hooks/useExperience';
import { LoadingSkeleton } from './LoadingSkeleton';

const experiences = [
  {
    type: 'education',
    title: 'BSc Computer Science',
    institution: 'University of Pretoria',
    location: 'Pretoria, South Africa',
    period: '2021 - 2024',
    description: 'Final year student specializing in software engineering, cloud computing, and application development. Focused on modern web technologies and scalable systems.',
    skills: ['Software Engineering', 'Cloud Computing', 'Data Structures', 'Algorithms'],
    icon: GraduationCap,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    type: 'work',
    title: 'Software Developer',
    institution: 'Freelance & Contract Work',
    location: 'Remote',
    period: '2022 - Present',
    description: 'Building modern web applications for various clients. Specialized in React, TypeScript, and cloud-based solutions. Delivered multiple successful projects across different industries.',
    skills: ['React', 'TypeScript', 'Supabase', 'Firebase', 'Node.js'],
    icon: Briefcase,
    color: 'from-green-500 to-emerald-500'
  },
  {
    type: 'work',
    title: 'Full-Stack Developer',
    institution: 'Various Projects',
    location: 'South Africa',
    period: '2021 - 2022',
    description: 'Developed comprehensive solutions including education platforms, mortgage applications, legal services portals, and fleet management systems.',
    skills: ['Full-Stack Development', 'Database Design', 'API Development', 'UI/UX'],
    icon: Briefcase,
    color: 'from-purple-500 to-pink-500'
  }
];

const TimelineItem = ({ experience, index, isInView }) => {
  const isEven = index % 2 === 0;
  
  // Helper function to get icon and color based on experience type
  const getExperienceConfig = (type) => {
    const configs = {
      'education': { icon: GraduationCap, color: 'from-blue-500 to-cyan-500' },
      'work': { icon: Briefcase, color: 'from-green-500 to-emerald-500' },
      'freelance': { icon: Briefcase, color: 'from-purple-500 to-pink-500' }
    };
    return configs[type] || { icon: Briefcase, color: 'from-gray-500 to-gray-600' };
  };

  const config = getExperienceConfig(experience.type);
  const IconComponent = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`flex ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col items-center gap-8 mb-12`}
    >
      {/* Content */}
      <motion.div
        whileHover={{ y: -5 }}
        className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'} text-center md:text-left`}
      >
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
          {/* Badge */}
          <div className={`inline-flex items-center space-x-2 bg-gradient-to-r ${config.color} text-white px-3 py-1 rounded-full text-sm font-medium mb-4`}>
            <IconComponent className="w-4 h-4" />
            <span className="capitalize">{experience.type}</span>
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {experience.title}
          </h3>
          
          {/* Institution */}
          <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
            {experience.institution}
          </p>
          
          {/* Period & Location */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{experience.start_year} - {experience.end_year || 'Present'}</span>
            </div>
            {experience.location && (
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{experience.location}</span>
              </div>
            )}
          </div>
          
          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            {experience.description}
          </p>
          
          {/* Skills - if available */}
          {experience.skills && experience.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {experience.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Timeline Dot */}
      <div className="relative flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
          className={`w-4 h-4 bg-gradient-to-r ${config.color} rounded-full shadow-lg`}
        />
        <div className="absolute top-4 left-2 w-0.5 h-12 bg-gray-300 dark:bg-gray-600" />
      </div>

      {/* Empty space for alignment */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
};

export default function Experience() {
  const { experience, loading } = useExperience();
  const [ref, isInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-4"
          >
            <Briefcase className="w-4 h-4" />
            <span>Professional Journey</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Experience & Education
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My academic background and professional experience in software development
          </p>
        </motion.div>

        {/* Timeline */}
        {loading ? (
          <div className="space-y-8">
            {[...Array(3)].map((_, index) => (
              <LoadingSkeleton key={index} type="card" />
            ))}
          </div>
        ) : (
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-300 dark:bg-gray-600 hidden md:block" />
            
            {/* Timeline Items */}
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <TimelineItem
                  key={exp.id}
                  experience={exp}
                  index={index}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Download Full Resume</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
} 