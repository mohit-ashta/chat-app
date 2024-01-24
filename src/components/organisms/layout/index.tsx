import React, { ReactNode } from "react";

import { useRouter } from "next/router";

import Header from "../header";
import { SidebarList } from "../sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div >
      <Header />
      <div className="md:flex md:h-[calc(100vh-80px)] block">
        <SidebarList />
        <div className="w-full">
          <div className="h-[calc(100vh-80px)] ">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
