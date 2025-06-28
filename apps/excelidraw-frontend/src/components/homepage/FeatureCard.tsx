import { useEffect, useState } from "react";

interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}


export const FeatureCard = ({ icon, title, description, delay = 0 }: FeatureCardProps) => {
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