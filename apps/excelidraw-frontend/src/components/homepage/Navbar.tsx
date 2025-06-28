import { Menu, Pen, X } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [scrollY, setScrollY] = useState(0);
    
      useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

    return (
        <div>
            {/* Navigation */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-3 sm:py-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <Pen className="text-white" size={16} />
                            </div>
                            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Excelidraw
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
        </div>
    )
}