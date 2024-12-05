import { ReactNode } from "react";

type HeaderTye = {
    children: ReactNode,
    className?: string,
    currentPage: string
}

const SectionHeader = ({ children, className, currentPage }: HeaderTye) => {

    return(
        <div className={`text-slate-600 p-2.5 font-medium text-sm md:text-base ${className}`}>
            {`${children} /`} <span className="text-slate-950">{currentPage}</span>
        </div>
    )
}

export default SectionHeader;