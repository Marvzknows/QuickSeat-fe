import { ReactNode } from "react";
import SectionHeader from "../../../components/Headers/AdminHeaders";

type AdminContainerType = {
  children: ReactNode;
  className?: string;
  sectionHeaderChildren: string;
  sectionHeaderCurrentPage: string;
};

const AdminContainer = ({
  children,
  className,
  sectionHeaderChildren,
  sectionHeaderCurrentPage,
}: AdminContainerType) => {
  return (
    <>
      <SectionHeader
        children={sectionHeaderChildren}
        currentPage={sectionHeaderCurrentPage}
      />
      <div
        className={`flex flex-col w-full h-screen rounded-lg shadow-5 bg-white text-xs gap-3 ${className}`}
      >
        {children}
      </div>
    </>
  );
};

export default AdminContainer;
