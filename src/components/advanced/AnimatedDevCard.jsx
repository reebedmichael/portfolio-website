import { useState, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Download, QrCode, Mail, Phone, MapPin, Globe, Github, Linkedin, X } from 'lucide-react';
import QRCode from 'react-qr-code';

const AnimatedDevCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const cardRef = useRef(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const generateVCard = () => {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:Michael de Beer
ORG:Full-Stack Developer
TITLE:Senior Software Engineer
EMAIL:michael@example.com
TEL:+1-555-0123
URL:https://michaeldebeer.dev
URL:https://github.com/michaeldebeer
URL:https://linkedin.com/in/michaeldebeer
ADR:;;San Francisco;CA;;;USA
NOTE:Passionate about creating innovative web solutions
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'michael-debeer.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const contactInfo = {
    name: 'Michael de Beer',
    title: 'Senior Full-Stack Developer',
    email: 'michael@example.com',
    phone: '+1 (555) 012-3456',
    location: 'San Francisco, CA',
    website: 'michaeldebeer.dev',
    github: 'github.com/michaeldebeer',
    linkedin: 'linkedin.com/in/michaeldebeer'
  };

  return (
    <>
      {/* Floating Card Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed top-6 right-6 z-50 p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
          isOpen ? 'hidden' : 'block'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Globe size={24} />
      </motion.button>

      {/* Dev Card Modal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <motion.div
          ref={cardRef}
          initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
          animate={{ 
            scale: isOpen ? 1 : 0.8, 
            opacity: isOpen ? 1 : 0,
            rotateY: isOpen ? 0 : -15
          }}
          exit={{ scale: 0.8, opacity: 0, rotateY: -15 }}
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: 'preserve-3d'
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-purple-600"
              >
                MD
              </motion.div>
              <h2 className="text-2xl font-bold mb-1">{contactInfo.name}</h2>
              <p className="text-purple-100">{contactInfo.title}</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="p-6 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center space-x-3 text-gray-700 dark:text-gray-300"
            >
              <Mail size={18} className="text-purple-600" />
              <span className="text-sm">{contactInfo.email}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center space-x-3 text-gray-700 dark:text-gray-300"
            >
              <Phone size={18} className="text-purple-600" />
              <span className="text-sm">{contactInfo.phone}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center space-x-3 text-gray-700 dark:text-gray-300"
            >
              <MapPin size={18} className="text-purple-600" />
              <span className="text-sm">{contactInfo.location}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center space-x-3 text-gray-700 dark:text-gray-300"
            >
              <Globe size={18} className="text-purple-600" />
              <span className="text-sm">{contactInfo.website}</span>
            </motion.div>

            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              <motion.a
                href={`https://${contactInfo.github}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Github size={18} className="text-gray-700 dark:text-gray-300" />
              </motion.a>
              
              <motion.a
                href={`https://${contactInfo.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Linkedin size={18} className="text-gray-700 dark:text-gray-300" />
              </motion.a>
            </div>

            {/* QR Code Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="pt-4 border-t border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowQR(!showQR)}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <QrCode size={16} />
                  <span className="text-sm">Show QR Code</span>
                </button>
                
                <button
                  onClick={generateVCard}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download size={16} />
                  <span className="text-sm">Download vCard</span>
                </button>
              </div>
              
              {showQR && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 flex justify-center"
                >
                  <div className="p-4 bg-white rounded-lg shadow-lg">
                    <QRCode
                      value={`https://${contactInfo.website}`}
                      size={128}
                      level="H"
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default AnimatedDevCard; 