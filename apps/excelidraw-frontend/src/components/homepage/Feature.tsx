import { Download, Pen, Shield, Smartphone, Users, Zap } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

export function Feature() {
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
        <div>
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
        </div>
    )
}