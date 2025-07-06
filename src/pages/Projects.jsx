import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ExternalLink, 
  Github, 
  Code, 
  Filter,
  X,
  Calendar,
  Users,
  Star,
  Eye
} from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { ProjectCardSkeleton } from '../components/LoadingSkeleton';

const projects = [
  {
    id: 1,
    name: 'Inala Education Platform',
    description: 'A comprehensive education platform connecting learners with providers. Features include course management, progress tracking, and interactive learning tools.',
    longDescription: 'Built a full-stack education platform that serves thousands of students and educators. Implemented real-time collaboration features, progress analytics, and a robust content management system. The platform supports multiple learning formats including video courses, interactive quizzes, and live sessions.',
    image: '/placeholder.png',
    technologies: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Framer Motion'],
    category: 'web',
    demo: 'https://demo.inala.com',
    github: 'https://github.com/michaeldebeer/inala',
    featured: true,
    year: '2024',
    team: 'Solo',
    stars: 45
  },
  {
    id: 2,
    name: 'MyHomeLoans',
    description: 'Modern mortgage application web app with real-time calculations, document upload, and application tracking.',
    longDescription: 'Developed a comprehensive mortgage application system that streamlines the entire loan process. Features include real-time interest calculations, document management, credit score integration, and automated approval workflows. The system processes thousands of applications monthly.',
    image: '/placeholder.png',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Stripe'],
    category: 'web',
    demo: 'https://myhomeloans.com',
    github: 'https://github.com/michaeldebeer/myhomeloans',
    featured: true,
    year: '2023',
    team: '3 developers',
    stars: 32
  },
  {
    id: 3,
    name: 'JV Legal Portal',
    description: 'Legal services portal with case management, client communication, and document automation.',
    longDescription: 'Created a comprehensive legal services platform that helps law firms manage cases, communicate with clients, and automate document generation. The system includes advanced search capabilities, secure document storage, and integration with legal databases.',
    image: '/placeholder.png',
    technologies: ['React', 'Python', 'Django', 'PostgreSQL', 'Redis'],
    category: 'web',
    demo: 'https://jvlegal.com',
    github: 'https://github.com/michaeldebeer/jvlegal',
    featured: false,
    year: '2023',
    team: '2 developers',
    stars: 28
  },
  {
    id: 4,
    name: 'FAW Trucks Dashboard',
    description: 'Fleet management dashboard with real-time tracking, maintenance scheduling, and analytics.',
    longDescription: 'Built a comprehensive fleet management system for FAW Trucks that tracks vehicle locations, monitors fuel consumption, schedules maintenance, and provides detailed analytics. The system helps optimize fleet operations and reduce costs.',
    image: '/placeholder.png',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Google Maps API'],
    category: 'web',
    demo: 'https://fawtrucks.com',
    github: 'https://github.com/michaeldebeer/fawtrucks',
    featured: false,
    year: '2023',
    team: '4 developers',
    stars: 41
  },
  {
    id: 5,
    name: 'KO Grains Trading',
    description: 'Agricultural trading platform with real-time market data, order management, and payment processing.',
    longDescription: 'Developed a sophisticated agricultural trading platform that connects farmers with buyers. Features include real-time market pricing, secure payment processing, logistics tracking, and comprehensive reporting tools.',
    image: '/placeholder.png',
    technologies: ['React', 'TypeScript', 'Supabase', 'Stripe', 'Chart.js'],
    category: 'web',
    demo: 'https://kograins.com',
    github: 'https://github.com/michaeldebeer/kograins',
    featured: true,
    year: '2022',
    team: 'Solo',
    stars: 67
  },
  {
    id: 6,
    name: 'DIY Realty',
    description: 'Property listing and management platform with virtual tours, mortgage calculator, and agent tools.',
    longDescription: 'Created a comprehensive real estate platform that helps users find, list, and manage properties. Features include virtual property tours, mortgage calculators, agent management tools, and advanced search filters.',
    image: '/placeholder.png',
    technologies: ['React', 'Firebase', 'Google Maps API', 'Stripe', 'WebRTC'],
    category: 'web',
    demo: 'https://diyrealty.com',
    github: 'https://github.com/michaeldebeer/diyrealty',
    featured: false,
    year: '2022',
    team: '3 developers',
    stars: 38
  }
];

const categories = [
  { id: 'all', label: 'All Projects', count: projects.length },
  { id: 'web', label: 'Web Apps', count: projects.filter(p => p.category === 'web').length },
  { id: 'mobile', label: 'Mobile Apps', count: projects.filter(p => p.category === 'mobile').length },
  { id: 'featured', label: 'Featured', count: projects.filter(p => p.featured).length }
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
              className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Demo</span>
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
              className="flex-1 flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Github className="w-4 h-4" />
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Modal Header */}
            <div className="relative p-6 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white pr-12">
                {project.name}
              </h2>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={project.cover_image_url || '/placeholder.png'}
                  alt={project.name}
                  className="w-full h-64 object-cover"
                />
              </div>

              {/* Project Description */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  About this project
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {project.long_description}
                </p>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack?.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Meta */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {project.year}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Year</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {project.featured ? 'Yes' : 'No'}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Featured</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {project.demo_url && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.open(project.demo_url, '_blank')}
                    className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>View Live Demo</span>
                  </motion.button>
                )}
                {project.github_url && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.open(project.github_url, '_blank')}
                    className="flex-1 flex items-center justify-center space-x-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold"
                  >
                    <Github className="w-5 h-5" />
                    <span>View Source Code</span>
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function Projects() {
  const { projects, loading } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ref, isInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Generate categories dynamically from projects data
  const categories = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'web', label: 'Web Apps', count: projects.filter(p => p.category === 'web').length },
    { id: 'mobile', label: 'Mobile Apps', count: projects.filter(p => p.category === 'mobile').length },
    { id: 'featured', label: 'Featured', count: projects.filter(p => p.featured).length }
  ];

  const filteredProjects = projects.filter(project => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'featured') return project.featured;
    return project.category === selectedCategory;
  });

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <Code className="w-4 h-4" />
            <span>Featured Work</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Projects & Portfolio
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my recent work and technical expertise
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category.label}
              <span className="ml-2 px-2 py-1 bg-white/20 dark:bg-black/20 rounded-full text-xs">
                {category.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[...Array(6)].map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={handleProjectClick}
              />
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-500 dark:text-gray-400 text-lg">
              No projects found for this category.
            </div>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
} 