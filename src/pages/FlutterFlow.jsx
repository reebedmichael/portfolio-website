import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ExternalLink, 
  Github, 
  Code, 
  Filter,
  X,
  Calendar,
  Star,
  Play,
  Mail,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { useFlutterFlowProjects } from '../hooks/useFlutterFlowProjects';
import { ProjectCardSkeleton } from '../components/LoadingSkeleton';

// FlutterFlow skills data
const flutterFlowSkills = [
  {
    category: 'Visual Development',
    skills: [
      { name: 'Drag & Drop UI', proficiency: 95 },
      { name: 'Custom Components', proficiency: 90 },
      { name: 'Responsive Design', proficiency: 88 },
      { name: 'Theme Management', proficiency: 85 }
    ]
  },
  {
    category: 'Backend Integration',
    skills: [
      { name: 'Firebase Integration', proficiency: 92 },
      { name: 'API Connections', proficiency: 88 },
      { name: 'Database Design', proficiency: 85 },
      { name: 'Authentication', proficiency: 90 }
    ]
  },
  {
    category: 'Advanced Features',
    skills: [
      { name: 'Custom Actions', proficiency: 85 },
      { name: 'State Management', proficiency: 88 },
      { name: 'Navigation & Routing', proficiency: 90 },
      { name: 'Performance Optimization', proficiency: 82 }
    ]
  },
  {
    category: 'Deployment & Publishing',
    skills: [
      { name: 'App Store Publishing', proficiency: 88 },
      { name: 'Google Play Store', proficiency: 88 },
      { name: 'Web Deployment', proficiency: 90 },
      { name: 'Version Management', proficiency: 85 }
    ]
  }
];

const categories = [
  { id: 'all', label: 'All Projects', count: 0 },
  { id: 'mobile', label: 'Mobile Apps', count: 0 },
  { id: 'web', label: 'Web Apps', count: 0 },
  { id: 'featured', label: 'Featured', count: 0 }
];

const ProjectCard = ({ project, onClick }) => {
  const [ref, isInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
      onClick={() => onClick(project)}
      className="group cursor-pointer bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
    >
      {/* Project Image */}
      <div className="relative mb-6 overflow-hidden rounded-xl">
        <img
          src={project.cover_image_url || '/placeholder.png'}
          alt={project.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {project.featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
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

        {/* Project Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{project.year}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{project.featured ? 'Featured' : 'Project'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-2">
          {project.demo_url && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.demo_url, '_blank');
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <ExternalLink size={16} />
              <span>Live Demo</span>
            </motion.button>
          )}
          {project.github_url && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.github_url, '_blank');
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              <Github size={16} />
              <span>Code</span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: isOpen ? 1 : 0.8, opacity: isOpen ? 1 : 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative p-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white pr-12">
            {project.name}
          </h2>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Project Image */}
          <div className="mb-6">
            <img
              src={project.cover_image_url || '/placeholder.png'}
              alt={project.name}
              className="w-full h-64 object-cover rounded-xl"
            />
          </div>

          {/* Project Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Description
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {project.long_description || project.description}
              </p>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack?.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Meta */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {project.year}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Year</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {project.featured ? 'Yes' : 'No'}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Featured</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              {project.demo_url && (
                <motion.a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink size={18} />
                  <span>View Live Demo</span>
                </motion.a>
              )}
              {project.github_url && (
                <motion.a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Github size={18} />
                  <span>View Source Code</span>
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function FlutterFlow() {
  const { projects, loading, error } = useFlutterFlowProjects();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [ref, isInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Update category counts
  const updatedCategories = categories.map(cat => ({
    ...cat,
    count: cat.id === 'all' ? projects.length : 
           cat.id === 'featured' ? projects.filter(p => p.featured).length :
           projects.filter(p => p.category === cat.id).length
  }));

  // Filter projects based on active category
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : activeCategory === 'featured'
    ? projects.filter(p => p.featured)
    : projects.filter(p => p.category === activeCategory);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back to Portfolio</span>
            </motion.a>
          </motion.div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              🚀 FlutterFlow
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Rapid app development without code. Creating beautiful, functional applications 
              with visual development tools that bring ideas to life faster than ever.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold"
              >
                Visual Development
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-purple-600 text-white rounded-full text-lg font-semibold"
              >
                No-Code Solutions
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-green-600 text-white rounded-full text-lg font-semibold"
              >
                Rapid Prototyping
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              FlutterFlow Expertise
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Mastery of visual development tools and no-code solutions for rapid application development.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {flutterFlowSkills.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.proficiency}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: (categoryIndex * 0.1) + (skillIndex * 0.1) }}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              FlutterFlow Projects
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A collection of applications built with FlutterFlow, showcasing rapid development and innovative solutions.
            </p>
          </motion.div>

          {/* Filter Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {updatedCategories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800/80'
                }`}
              >
                {category.label} ({category.count})
              </motion.button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <ProjectCardSkeleton key={index} />
              ))
            ) : error ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">
                  Unable to load FlutterFlow projects. Please try again later.
                </p>
              </div>
            ) : filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={handleProjectClick}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">
                  No projects found for the selected category.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tutorials Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              FlutterFlow Tutorials
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Learn FlutterFlow development through comprehensive tutorials and guides.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Getting Started with FlutterFlow
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Complete beginner's guide
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Learn the fundamentals of FlutterFlow development, from setting up your first project 
                to deploying your first app. Perfect for beginners and those new to no-code development.
              </p>
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Video Tutorial Coming Soon</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Advanced FlutterFlow Techniques
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Custom actions & integrations
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Dive deep into advanced FlutterFlow features including custom actions, 
                API integrations, and performance optimization techniques.
              </p>
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Video Tutorial Coming Soon</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Let's discuss your FlutterFlow project and bring your ideas to life with rapid, 
              no-code development solutions.
            </p>
            <motion.a
              href="#"
              onClick={() => window.location.hash = ''}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-semibold"
            >
              <Mail size={20} />
              <span>Contact Me</span>
              <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
      />
    </div>
  );
} 