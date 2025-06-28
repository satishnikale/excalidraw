import { CheckCircle } from "lucide-react";

export function Pricing() {
    return <div>
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
    </div>
}