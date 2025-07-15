import { ReactNode } from "react";

export function IconButton({
    icon, onClick, activated
}: {
    icon: ReactNode,
    onClick: () => void,
    activated: boolean
}) {
    return <div className={`m-1 p-[8px] sm:p-[8px] rounded-lg transition-all duration-200 ${activated ? "bg-[#403e6a] text-gray-300 shadow-lg" : "text-gray-300 hover:bg-gray-700"}`} onClick={onClick}>
        {icon}
    </div>
}