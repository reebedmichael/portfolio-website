// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';

export default function Footer() {
  const { siteSettings, loading } = useSiteSettings();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      href: siteSettings?.github_link || 'https://github.com/michaeldebeer',
      icon: Github,
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      name: 'LinkedIn',
      href: siteSettings?.linkedin_link || 'https://linkedin.com/in/michaeldebeer',
      icon: Linkedin,
      color: 'hover:text-blue-600 dark:hover:text-blue-400'
    },
    {
      name: 'Email',
      href: `mailto:${siteSettings?.email_address || 'michael@example.com'}`,
      icon: Mail,
      color: 'hover:text-red-600 dark:hover:text-red-400'
    }
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="relative bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.02),transparent_50%)]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Michael de Beer
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Software Developer
                  </p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">
                Passionate about creating innovative digital solutions and building 
                meaningful experiences through code. Let's connect and build something amazing together.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ${social.color}`}
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 4 }}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Get In Touch
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  {siteSettings?.email_address || 'michael@example.com'}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  Available for opportunities
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 text-sm">
              <span>© {currentYear} Michael de Beer. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span className="hidden sm:inline">in South Africa</span>
            </div>

            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-sm font-medium">Back to top</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 