import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { useFlutterFlowProjects } from '../hooks/useFlutterFlowProjects';
import { ProjectCardSkeleton } from './LoadingSkeleton';

const FlutterFlowHighlight = () => {
  const { projects, loading, error } = useFlutterFlowProjects();
  const [ref, isInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Get 2 featured projects or first 2 projects
  const featuredProjects = projects
    .filter(project => project.featured)
    .slice(0, 2);
  
  const displayProjects = featuredProjects.length >= 2 
    ? featuredProjects 
    : projects.slice(0, 2);

  const handleProjectClick = (project) => {
    if (project.demo_url) {
      window.open(project.demo_url, '_blank');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            🚀 FlutterFlow Highlight
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Rapid app development with FlutterFlow - creating beautiful, functional applications 
            without writing a single line of code. See how I leverage visual development to 
            bring ideas to life faster than ever.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {loading ? (
            <>
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
            </>
          ) : error ? (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                Unable to load FlutterFlow projects. Please try again later.
              </p>
            </div>
          ) : displayProjects.length > 0 ? (
            displayProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => handleProjectClick(project)}
                className="group cursor-pointer bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative mb-6 overflow-hidden rounded-xl">
                  <img
                    src={project.cover_image_url || '/placeholder.png'}
                    alt={project.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {project.type && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {project.type}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Project Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack?.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech_stack && project.tech_stack.length > 3 && (
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                        +{project.tech_stack.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Project Description */}
                  <div className="pt-2">
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                      {project.long_description || project.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                No FlutterFlow projects available yet. Check back soon!
              </p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <motion.a
            href="#flutterflow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span className="text-lg font-semibold">FlutterFlow Highlights</span>
            <ArrowRight size={20} />
          </motion.a>
        </motion.div>
      </div>
  );
};

export default FlutterFlowHighlight; 