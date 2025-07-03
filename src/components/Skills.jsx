// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Code, 
  Database, 
  Cloud, 
  Smartphone, 
  Globe, 
  Zap,
  Database as DatabaseIcon,
  Cloud as CloudIcon,
  Smartphone as MobileIcon
} from 'lucide-react';

// Custom Python icon component
const PythonIcon = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm-1 4v6h2V6h-2zm0 8v2h2v-2h-2z"/>
  </svg>
);

// Custom React icon component
const ReactIcon = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.53 0-3.12.613-4.27 1.829-.19.2-.19.515 0 .715.19.2.495.2.685 0a5.95 5.95 0 0 1 3.585-1.544c3.25 0 5.89 2.64 5.89 5.89 0 3.25-2.64 5.89-5.89 5.89a5.95 5.95 0 0 1-3.585-1.544c-.19-.2-.495-.2-.685 0-.19.2-.19.515 0 .715.19.2.495.2.685 0 1.15 1.216 2.74 1.829 4.27 1.829 4.27 0 7.75-3.48 7.75-7.75s-3.48-7.75-7.75-7.75z"/>
  </svg>
);

// Custom TypeScript icon component
const TypeScriptIcon = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
  </svg>
);

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'React', level: 90, icon: ReactIcon },
      { name: 'TypeScript', level: 85, icon: TypeScriptIcon },
      { name: 'JavaScript', level: 95, icon: Code },
      { name: 'HTML/CSS', level: 90, icon: Code },
      { name: 'Tailwind CSS', level: 88, icon: Code },
    ]
  },
  {
    title: 'Backend & Database',
    icon: Database,
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'Python', level: 85, icon: PythonIcon },
      { name: 'SQL', level: 80, icon: DatabaseIcon },
      { name: 'Supabase', level: 88, icon: DatabaseIcon },
      { name: 'Firebase', level: 82, icon: DatabaseIcon },
      { name: 'Node.js', level: 75, icon: Code },
    ]
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'Google Cloud', level: 78, icon: CloudIcon },
      { name: 'Docker', level: 70, icon: CloudIcon },
      { name: 'Git/GitHub', level: 90, icon: CloudIcon },
      { name: 'CI/CD', level: 75, icon: CloudIcon },
      { name: 'AWS', level: 65, icon: CloudIcon },
    ]
  },
  {
    title: 'Mobile & Cross-Platform',
    icon: Smartphone,
    color: 'from-orange-500 to-red-500',
    skills: [
      { name: 'Flutter', level: 80, icon: MobileIcon },
      { name: 'React Native', level: 75, icon: MobileIcon },
      { name: 'Dart', level: 78, icon: Code },
      { name: 'Mobile UI/UX', level: 82, icon: MobileIcon },
      { name: 'PWA', level: 70, icon: Globe },
    ]
  }
];

const SkillBar = ({ skill, isInView }) => (
  <div className="mb-6">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center space-x-2">
        <skill.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        <span className="font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <motion.div
        className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
        initial={{ width: 0 }}
        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
    </div>
  </div>
);

const SkillCard = ({ category, index }) => {
  const [ref, isInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color}`}>
          <category.icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {category.title}
        </h3>
      </div>
      
      <div className="space-y-4">
        {category.skills.map((skill) => (
          <SkillBar 
            key={skill.name} 
            skill={skill} 
            isInView={isInView}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default function Skills() {
  const [ref, isInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="skills" className="py-20 relative">
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
            <Zap className="w-4 h-4" />
            <span>Technical Expertise</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard 
              key={category.title} 
              category={category} 
              index={index}
            />
          ))}
        </div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
            Additional Skills & Tools
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'GraphQL', 'REST APIs', 'Jest', 'Cypress', 'Figma', 'Adobe XD',
              'PostgreSQL', 'MongoDB', 'Redis', 'Nginx', 'Vercel', 'Netlify',
              'Agile/Scrum', 'JIRA', 'Slack', 'VS Code', 'Postman', 'Insomnia'
            ].map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 