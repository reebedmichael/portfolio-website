import { useState, useEffect, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Tag, Code, Globe, Star } from 'lucide-react';

const ProjectSearch = ({ projects, onFilteredProjects }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [isExpanded, setIsExpanded] = useState(false);

  // Extract all unique tags and technologies from projects
  const allTags = useMemo(() => {
    const tags = new Set();
    const technologies = new Set();
    
    projects.forEach(project => {
      if (project.tags) {
        project.tags.forEach(tag => tags.add(tag));
      }
      if (project.technologies) {
        project.technologies.forEach(tech => technologies.add(tech));
      }
    });
    
    return {
      tags: Array.from(tags).sort(),
      technologies: Array.from(technologies).sort()
    };
  }, [projects]);

  // Fuzzy search function
  const fuzzySearch = (text, query) => {
    const pattern = query.split('').join('.*');
    const regex = new RegExp(pattern, 'i');
    return regex.test(text);
  };

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      // Search term filter
      const matchesSearch = !searchTerm || 
        fuzzySearch(project.title, searchTerm) ||
        fuzzySearch(project.description, searchTerm) ||
        fuzzySearch(project.technologies?.join(' '), searchTerm) ||
        fuzzySearch(project.tags?.join(' '), searchTerm);

      // Tags filter
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => project.tags?.includes(tag));

      // Technologies filter
      const matchesTechnologies = selectedTechnologies.length === 0 || 
        selectedTechnologies.some(tech => project.technologies?.includes(tech));

      return matchesSearch && matchesTags && matchesTechnologies;
    });

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'popularity':
          return (b.stars || 0) - (a.stars || 0);
        case 'complexity':
          return (b.complexity || 0) - (a.complexity || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [projects, searchTerm, selectedTags, selectedTechnologies, sortBy]);

  // Update parent component with filtered projects
  useEffect(() => {
    onFilteredProjects(filteredProjects);
  }, [filteredProjects, onFilteredProjects]);

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const toggleTechnology = (tech) => {
    setSelectedTechnologies(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
    setSelectedTechnologies([]);
    setSortBy('name');
  };

  const hasActiveFilters = searchTerm || selectedTags.length > 0 || selectedTechnologies.length > 0 || sortBy !== 'name';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
      {/* Search Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Search size={20} className="text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Search Projects
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <Filter size={16} />
          </button>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search projects by name, description, technologies, or tags..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {filteredProjects.length} of {projects.length} projects
        </span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="name">Sort by Name</option>
          <option value="date">Sort by Date</option>
          <option value="popularity">Sort by Popularity</option>
          <option value="complexity">Sort by Complexity</option>
        </select>
      </div>

      {/* Active Filters */}
      {(selectedTags.length > 0 || selectedTechnologies.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="flex flex-wrap gap-2">
            {selectedTags.map(tag => (
              <motion.span
                key={tag}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-full text-sm"
              >
                <Tag size={12} className="mr-1" />
                {tag}
                <button
                  onClick={() => toggleTag(tag)}
                  className="ml-2 hover:text-blue-600 dark:hover:text-blue-300"
                >
                  <X size={12} />
                </button>
              </motion.span>
            ))}
            {selectedTechnologies.map(tech => (
              <motion.span
                key={tech}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-full text-sm"
              >
                <Code size={12} className="mr-1" />
                {tech}
                <button
                  onClick={() => toggleTechnology(tech)}
                  className="ml-2 hover:text-green-600 dark:hover:text-green-300"
                >
                  <X size={12} />
                </button>
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Advanced Filters */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
              {/* Tags Filter */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                  <Tag size={16} className="mr-2" />
                  Filter by Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {allTags.tags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                        selectedTags.includes(tag)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Technologies Filter */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                  <Code size={16} className="mr-2" />
                  Filter by Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {allTags.technologies.map(tech => (
                    <button
                      key={tech}
                      onClick={() => toggleTechnology(tech)}
                      className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                        selectedTechnologies.includes(tech)
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{filteredProjects.length}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Projects</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{allTags.technologies.length}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Technologies</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{allTags.tags.length}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Categories</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSearch; 