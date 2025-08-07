import React from 'react';
import { motion } from 'framer-motion';
import { Pen, Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <motion.footer
      variants ={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-white dark:bg-black text-white py-12 shadow-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 mb-4"
            >
              <div className="p-2 bg-purple-600 rounded-lg">
                <Pen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-600">100xDraw</span>
            </motion.div>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md leading-relaxed">
              The ultimate digital whiteboard for teams, designers, and creators. 
              Bring your ideas to life with intuitive drawing tools and real-time collaboration.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Twitter, href: 'https://x.com/satish_nikale', label: 'Twitter' },
                { icon: Github, href: 'https://github.com/satishnikale', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/satishnikale', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:satishnikale7@gmail.com', label: 'Email' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-gray-800 dark:bg-gray-900 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-600 dark:text-gray-400">Product</h3>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Updates', 'Beta'].map((item) => (
                <li key={item}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-600 dark:text-gray-400">Company</h3>
            <ul className="space-y-2">
              {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {currentYear} 100xDraw. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <motion.a
                key={item}
                href="#"
                whileHover={{ color: '#ffffff' }}
                className="text-gray-600 dark:text-gray-600 hover:text-white text-sm transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;