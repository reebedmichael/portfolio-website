import { motion } from 'framer-motion';

export const LoadingSkeleton = ({ type = 'card', lines = 3, className = '' }) => {
  const skeletonVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (type === 'card') {
    return (
      <motion.div
        variants={skeletonVariants}
        animate="animate"
        className={`bg-gray-200 dark:bg-gray-700 rounded-xl p-6 ${className}`}
      >
        <div className="space-y-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/6"></div>
        </div>
      </motion.div>
    );
  }

  if (type === 'text') {
    return (
      <div className={`space-y-3 ${className}`}>
        {[...Array(lines)].map((_, i) => (
          <motion.div
            key={i}
            variants={skeletonVariants}
            animate="animate"
            className={`h-4 bg-gray-200 dark:bg-gray-700 rounded ${
              i === 0 ? 'w-3/4' : i === lines - 1 ? 'w-1/2' : 'w-full'
            }`}
          />
        ))}
      </div>
    );
  }

  if (type === 'avatar') {
    return (
      <motion.div
        variants={skeletonVariants}
        animate="animate"
        className={`w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full ${className}`}
      />
    );
  }

  if (type === 'button') {
    return (
      <motion.div
        variants={skeletonVariants}
        animate="animate"
        className={`h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-32 ${className}`}
      />
    );
  }

  return null;
};

export const ProjectCardSkeleton = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
  >
    <div className="space-y-4">
      {/* Image skeleton */}
      <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
      
      {/* Title skeleton */}
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
      
      {/* Description skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
      </div>
      
      {/* Tags skeleton */}
      <div className="flex space-x-2">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16 animate-pulse"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20 animate-pulse"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-14 animate-pulse"></div>
      </div>
    </div>
  </motion.div>
);

export const SkillCardSkeleton = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
  >
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
      </div>
      
      {/* Skill bars skeleton */}
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-8 animate-pulse"></div>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
); 