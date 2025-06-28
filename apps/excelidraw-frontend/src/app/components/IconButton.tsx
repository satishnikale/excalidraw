// import { useState } from "react";
// import { Circle, Image, Minus, MousePointer, Pen, Square, Type } from "lucide-react";


// export function IconButto() {
//     const [currentTool, setCurrentTool] = useState('rectangle');
    
//     return (
//         <div className="flex flex-wrap absolute top-3 bg-[#222328] rounded-lg left-[40%]">
//             {[
//                 { icon: <MousePointer size={14} />, id: 'select' },
//                 { icon: <Pen size={14} />, id: 'pen' },
//                 { icon: <Square size={14} />, id: 'rectangle' },
//                 { icon: <Circle size={14} />, id: 'circle' },
//                 { icon: <Minus size={14} />, id: 'line' },
//                 { icon: <Type size={14} />, id: 'text' },
//                 { icon: <Image size={14} />, id: 'image' }
//             ].map(tool => (
//                 <button
//                     key={tool.id}
//                     onClick={() => setCurrentTool(tool.id)}
//                     className={`m-1 p-2 sm:p-3 rounded-lg transition-all duration-200 ${currentTool === tool.id
//                         ? 'bg-[#403e6a] text-gray-300 shadow-lg'
//                         : 'text-gray-300 hover:bg-gray-700'
//                         }`}
//                 >
//                     {tool.icon}
//                 </button>
//             ))}
//         </div>
//     )
// }

import { ReactNode } from "react";

export function IconButton({
    icon, onClick, activated
}: {
    icon: ReactNode,
    onClick: () => void,
    activated: boolean
}) {
    return <div className={`m-1 p-2 sm:p-3 rounded-lg transition-all duration-200 ${activated ? "bg-[#403e6a] text-gray-300 shadow-lg" : "text-gray-300 hover:bg-gray-700"}`} onClick={onClick}>
        {icon}
    </div>
}