import React, { ReactNode } from "react";

import { useRouter } from "next/router";
import { Sidebar } from "../sidebar";
import Header from "../header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div >
      <Header />
      <div className="md:flex md:h-[calc(100vh-88.88px)] block">
        <Sidebar />
        <div className="w-full">
          <div className="h-[calc(100vh-168.88px)] ">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
