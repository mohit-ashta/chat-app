import { SidebarMenu } from "@/components/atoms/menu-lists";
import { SidebarChatList } from "@/constants/data";

import { useRouter } from "next/router";

import TopFilter from "../filter-list";

export const Sidebar = () => {
  const router = useRouter();
  return (
    <div className="bg-BgColor w-[300px] border border-dashded border-r-[#353535] shadow-[#ffffff] lg:flex flex-col gap-2 ">
      <TopFilter />
      <ul>
        {SidebarChatList.map((item, idx) => {
          return (
            <li key={idx}>
              <SidebarMenu
                key={idx}
                title={item.title}
                link={item.link}
                icon={item.icon}
                className={`text-black hover:bg-greyish hover:text-black   ${
                  router.pathname == item.link ? "text-black bg-greyish" : ""
                }`}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
