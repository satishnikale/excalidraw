import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Pen, 
  Share2, 
  Layers, 
  Smartphone, 
  Cloud, 
  Palette,
  Users,
  Zap,
  Download
} from 'lucide-react';

const Features: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const features = [
    {
      icon: Pen,
      title: "Advanced Drawing Tools",
      description: "Professional-grade brushes, shapes, and vector tools for precise creation.",
      color: "bg-purple-600"
    },
    {
      icon: Users,
      title: "Real-time Collaboration",
      description: "Work together with unlimited team members in real-time.",
      color: "bg-blue-600"
    },
    {
      icon: Cloud,
      title: "Cloud Sync",
      description: "Access your work from anywhere with automatic cloud synchronization.",
      color: "bg-green-600"
    },
    {
      icon: Smartphone,
      title: "Cross-Platform",
      description: "Works seamlessly on desktop, tablet, and mobile devices.",
      color: "bg-orange-600"
    },
    {
      icon: Layers,
      title: "Layer Management",
      description: "Organize your artwork with unlimited layers and blending modes.",
      color: "bg-indigo-600"
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share your creations with customizable permissions and links.",
      color: "bg-pink-600"
    },
    {
      icon: Palette,
      title: "Rich Color System",
      description: "Extensive color palettes and gradient tools for vibrant artwork.",
      color: "bg-red-600"
    },
    {
      icon: Zap,
      title: "Performance Optimized",
      description: "Smooth 60fps drawing with hardware acceleration support.",
      color: "bg-yellow-600"
    },
    {
      icon: Download,
      title: "Multiple Export Formats",
      description: "Export in PNG, SVG, PDF, and other popular formats.",
      color: "bg-teal-600"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              create
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Powerful tools and features designed for professionals, teams, and creative enthusiasts.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow duration-300`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;