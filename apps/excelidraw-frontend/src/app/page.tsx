"use client"
import React, { useState, useEffect } from 'react';
import {
  Pen,
  Users,
  Download,
  Zap,
  Shield,
  Smartphone,
  Menu,
  X,
  ArrowRight,
  Star,
  CheckCircle,
  Github,
  Twitter,
  Mail,
  Play,
  MousePointer,
  Square,
  Circle,
  Minus,
  Type,
  Image,
  Share2
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-4 sm:mb-6">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{description}</p>
    </div>
  );
};

const DrawingCanvas: React.FC = () => {
  const [currentTool, setCurrentTool] = useState('pen');

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 w-full max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <div className="flex flex-wrap gap-2">
          {[
            { icon: <MousePointer size={16} />, id: 'select' },
            { icon: <Pen size={16} />, id: 'pen' },
            { icon: <Square size={16} />, id: 'rectangle' },
            { icon: <Circle size={16} />, id: 'circle' },
            { icon: <Minus size={16} />, id: 'line' },
            { icon: <Type size={16} />, id: 'text' },
            { icon: <Image size={16} />, id: 'image' }
          ].map(tool => (
            <button
              key={tool.id}
              onClick={() => setCurrentTool(tool.id)}
              className={`p-2 sm:p-3 rounded-lg transition-all duration-200 ${currentTool === tool.id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {tool.icon}
            </button>
          ))}
        </div>
        <div className="flex space-x-2">
          <button className="p-2 sm:p-3 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            <Share2 size={16} />
          </button>
          <button className="p-2 sm:p-3 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            <Download size={16} />
          </button>
        </div>
      </div>
      <div className="bg-gray-50 rounded-xl h-48 sm:h-64 md:h-80 flex items-center justify-center border-2 border-dashed border-gray-200">
        <div className="text-center px-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-3 sm:mb-4">
            <Pen size={20} />
          </div>
          <p className="text-gray-500 font-medium text-sm sm:text-base">Interactive Drawing Canvas</p>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">Start creating amazing diagrams</p>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Pen size={20} />,
      title: "Intuitive Drawing Tools",
      description: "Express your ideas with our comprehensive set of drawing tools. From freehand sketches to precise geometric shapes.",
      delay: 100
    },
    {
      icon: <Users size={20} />,
      title: "Real-time Collaboration",
      description: "Work together seamlessly with your team. See changes in real-time and communicate through integrated comments.",
      delay: 200
    },
    {
      icon: <Download size={20} />,
      title: "Export Anywhere",
      description: "Export your creations in multiple formats including PNG, SVG, PDF, and more. Perfect for presentations and documentation.",
      delay: 300
    },
    {
      icon: <Zap size={20} />,
      title: "Lightning Fast",
      description: "Built for speed and performance. Create complex diagrams without any lag or performance issues.",
      delay: 400
    },
    {
      icon: <Shield size={20} />,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security. Work confidently knowing your designs are safe.",
      delay: 500
    },
    {
      icon: <Smartphone size={20} />,
      title: "Cross-Platform",
      description: "Access your work from anywhere. Fully responsive design that works perfectly on desktop, tablet, and mobile.",
      delay: 600
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-poppins">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Pen className="text-white" size={16} />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                100xDraw
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm lg:text-base">Features</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm lg:text-base">Pricing</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm lg:text-base">About</a>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 lg:px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200 font-medium text-sm lg:text-base">
                Get Started
              </button>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t shadow-lg">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">Features</a>
              <a href="#pricing" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">Pricing</a>
              <a href="#about" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">About</a>
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg mt-4 font-medium">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
              Create Amazing
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block mt-2 pb-3">
                Diagrams & Sketches
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-10 leading-relaxed px-4">
              The most intuitive drawing and diagramming tool for teams.
              Create beautiful flowcharts, wireframes, and sketches in seconds.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
              <button className="w-full xs:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:shadow-xl transition-all duration-200 flex items-center justify-center group">
                Start Drawing Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </button>
              <button className="w-full xs:w-auto border-2 border-gray-300 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-200 flex items-center justify-center">
                <Play className="mr-2" size={18} />
                Watch Demo
              </button>
            </div>
          </div>

          <div className="mt-12 sm:mt-20 px-4">
            <DrawingCanvas />
          </div>

          <div className="mt-8 sm:mt-16 flex flex-col xs:flex-row justify-center items-center space-y-4 xs:space-y-0 xs:space-x-6 sm:space-x-8 text-gray-500 px-4">
            <div className="flex items-center space-x-2">
              <Star className="text-yellow-400 fill-current" size={16} />
              <span className="text-sm">4.9/5 rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users size={16} />
              <span className="text-sm">100K+ users</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield size={16} />
              <span className="text-sm">Enterprise security</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Everything You Need to
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block mt-2">
                Create & Collaborate
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Powerful features designed to help you bring your ideas to life,
              whether you're working solo or with a team.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={feature.delay}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-12 sm:mb-16 max-w-2xl mx-auto px-4">
            Choose the perfect plan for your needs. Start free and upgrade as you grow.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Free</h3>
              <div className="mb-6">
                <span className="text-4xl sm:text-5xl font-bold text-gray-900">$0</span>
                <span className="text-gray-600 ml-2">forever</span>
              </div>
              <ul className="space-y-3 mb-6 sm:mb-8 text-left text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={20} />
                  <span className="text-sm sm:text-base">Up to 3 boards</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={20} />
                  <span className="text-sm sm:text-base">Basic drawing tools</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={20} />
                  <span className="text-sm sm:text-base">PNG export</span>
                </li>
              </ul>
              <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-600 transition-colors">
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 sm:p-8 shadow-xl text-white relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-orange-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl sm:text-5xl font-bold">$12</span>
                <span className="opacity-80 ml-2">per month</span>
              </div>
              <ul className="space-y-3 mb-6 sm:mb-8 text-left">
                <li className="flex items-center">
                  <CheckCircle className="mr-3 flex-shrink-0" size={20} />
                  <span className="text-sm sm:text-base">Unlimited boards</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 flex-shrink-0" size={20} />
                  <span className="text-sm sm:text-base">Advanced tools</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 flex-shrink-0" size={20} />
                  <span className="text-sm sm:text-base">Real-time collaboration</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 flex-shrink-0" size={20} />
                  <span className="text-sm sm:text-base">All export formats</span>
                </li>
              </ul>
              <button className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Free Trial
              </button>
            </div>

            {/* Team Plan */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Team</h3>
              <div className="mb-6">
                <span className="text-4xl sm:text-5xl font-bold text-gray-900">$24</span>
                <span className="text-gray-600 ml-2">per month</span>
              </div>
              <ul className="space-y-3 mb-6 sm:mb-8 text-left text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={20} />
                  <span className="text-sm sm:text-base">Everything in Pro</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={20} />
                  <span className="text-sm sm:text-base">Team management</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={20} />
                  <span className="text-sm sm:text-base">Advanced permissions</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={20} />
                  <span className="text-sm sm:text-base">Priority support</span>
                </li>
              </ul>
              <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-600 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Ready to Start Creating?
          </h2>
          <p className="text-lg sm:text-xl mb-8 sm:mb-10 opacity-90 px-4">
            Join thousands of creators who trust 100xDraw for their visual communication needs.
          </p>
          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center px-4">
            <button className="w-full xs:w-auto bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Free Trial
            </button>
            <button className="w-full xs:w-auto border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Pen className="text-white" size={16} />
                </div>
                <span className="text-xl sm:text-2xl font-bold">100xDraw</span>
              </div>
              <p className="text-gray-400 mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
                The most intuitive drawing and diagramming tool for modern teams.
                Create, collaborate, and share your ideas effortlessly.
              </p>
              <div className="flex space-x-3 sm:space-x-4">
                <button className="bg-gray-800 p-2 sm:p-3 rounded-lg hover:bg-gray-700 transition-colors">
                  <Github size={18} />
                </button>
                <button className="bg-gray-800 p-2 sm:p-3 rounded-lg hover:bg-gray-700 transition-colors">
                  <Twitter size={18} />
                </button>
                <button className="bg-gray-800 p-2 sm:p-3 rounded-lg hover:bg-gray-700 transition-colors">
                  <Mail size={18} />
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-gray-400 text-sm sm:text-base">
            <p>&copy; 2024 100xDraw. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;