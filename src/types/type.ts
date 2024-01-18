import { ReactNode } from "react";
export interface SidebarMenuProps {
    title: string;
    icon: ReactNode;
    link: string;
    className?: string;
  }

  export interface SignUpFormProps {
    name: string;
    email: string;
    password: string;
    handleSignup?: () => void;
  }