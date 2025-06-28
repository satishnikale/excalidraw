export function CallToAction() {
    return (
        <div>
            <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                        Ready to Start Creating?
                    </h2>
                    <p className="text-lg sm:text-xl mb-8 sm:mb-10 opacity-90 px-4">
                        Join thousands of creators who trust Excelidraw for their visual communication needs.
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
        </div>
    )
}