import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './pages/Projects';
import FlutterFlow from './pages/FlutterFlow';
import FlutterFlowHighlight from './components/FlutterFlowHighlight';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import { useSiteSettings } from './hooks/useSiteSettings';
import { useAbout } from './hooks/useAbout';
import { useFavicon } from './hooks/useFavicon';

// Advanced Components
import AIChatWidget from './components/advanced/AIChatWidget';
import LiveCodeEditor from './components/widgets/LiveCodeEditor';
import SkillsRadarChart from './components/advanced/SkillsRadarChart';
import TerminalTimeline from './components/advanced/TerminalTimeline';
import AnimatedDevCard from './components/advanced/AnimatedDevCard';
import CodeChallengeGame from './components/games/CodeChallengeGame';
import VoiceInteraction from './components/advanced/VoiceInteraction';
import EnhancedParticleBackground from './components/advanced/EnhancedParticleBackground';
import FloatingActionButtons from './components/FloatingActionButtons';

export default function App() {
  const { siteSettings } = useSiteSettings();
  const { about } = useAbout();
  const [dark, setDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdvancedFeatures, setShowAdvancedFeatures] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  // Handle hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentPage(hash || 'home');
      
      // Scroll to top when navigating to FlutterFlow page
      if (hash === 'flutterflow') {
        window.scrollTo(0, 0);
      }
    };

    // Set initial page
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setDark(true);
    }
  }, []);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  // Update document title
  useEffect(() => {
    if (siteSettings?.site_title) {
      document.title = siteSettings.site_title;
    }
  }, [siteSettings]);

  // Update favicon with profile photo
  useFavicon(about?.photo_url);

  // Ensure page starts at top when loading
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Show advanced features after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAdvancedFeatures(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Michael de Beer
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Loading amazing things...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      dark 
        ? 'dark bg-gray-950 text-white' 
        : 'bg-white text-gray-900'
    }`}>
      {/* Enhanced Particle Background */}
      <EnhancedParticleBackground />
      
      {/* Navbar */}
      <Navbar dark={dark} setDark={setDark} />

      {/* Main Content */}
      <main className="relative">
        {currentPage === 'flutterflow' ? (
          <FlutterFlow />
        ) : (
          <>
            {/* Hero Section */}
            <Hero />

                    {/* About Section */}
        <section id="about" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <About />
          </div>
        </section>

        {/* FlutterFlow Highlight Section */}
        <section id="flutterflow-highlight" className="py-20 relative">
          <FlutterFlowHighlight />
        </section>

        {/* Skills Section */}
        <Skills />

        {/* Advanced Skills Radar Chart */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SkillsRadarChart />
          </div>
        </section>

        {/* Experience Section */}
        <Experience />

        {/* Terminal Timeline */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TerminalTimeline />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Projects />
          </div>
        </section>

            {/* Contact Section */}
            <ContactForm />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Advanced Features - Floating Widgets */}
      <AnimatePresence>
        {showAdvancedFeatures && (
          <>
            {/* AI Chat Widget */}
            <AIChatWidget />
            
            {/* Live Code Editor */}
            <LiveCodeEditor />
            
            {/* Animated Dev Card */}
            <AnimatedDevCard />
            
            {/* Code Challenge Game */}
            <CodeChallengeGame />
            
            {/* Voice Interaction */}
            <VoiceInteraction />
          </>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons Group (Web Only) */}
      <FloatingActionButtons />
    </div>
  );
}

// Scroll Progress Component
function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.pageYOffset / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 origin-left"
      style={{ scaleX: scrollProgress / 100 }}
    />
  );
}
