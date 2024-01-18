import { SidebarMenuProps } from "@/types/type";
import Link from "next/link";

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  title,
  link,
  icon,
  className,
}) => {
  return (
    <Link
      href={link}
      className={`text-[16px] leading-[16.42px] font-normal  flex gap-2 items-center px-5 py-4 w-full ${className}`}
    >
     {icon}
      {title}
    </Link>
  );
};
