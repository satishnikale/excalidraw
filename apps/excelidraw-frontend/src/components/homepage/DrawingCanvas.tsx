import { Circle, Download, Image, Minus, MousePointer, Pen, Share2, Square, Type } from "lucide-react";
import { useState } from "react";

export const DrawingCanvas: React.FC = () => {
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