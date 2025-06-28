import { Github, Mail, Pen, Twitter } from "lucide-react";

export function Footer() {
    return (
        <div>
            <footer className="bg-gray-900 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="md:col-span-2">
                            <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                    <Pen className="text-white" size={16} />
                                </div>
                                <span className="text-xl sm:text-2xl font-bold">Excelidraw</span>
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
                        <p>&copy; 2024 Excelidraw. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}