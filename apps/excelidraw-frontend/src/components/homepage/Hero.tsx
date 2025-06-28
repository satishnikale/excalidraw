import { ArrowRight, Play, Shield, Star, Users } from "lucide-react";
import { DrawingCanvas } from "./DrawingCanvas";

export function Hero() {
    return (
        <div>
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
        </div>
    )
}