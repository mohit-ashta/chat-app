import { RxDashboard } from "react-icons/rx";
import { Routes } from "./routes";
import { FaList } from "react-icons/fa";
import Image from "next/image";

export const SidebarChatList = [
  {
    link: Routes.DASHBOARD.absolutePath,
    title: "Testing",
    icon: (
      <Image
        src={"/images/profile2.jpg"}
        alt=""
        width={66}
        height={78}
        className="rounded-full object-cover object-center w-10 h-10"
      />
    ),
  },
  {
    link: Routes.PROFILE.absolutePath,
    title: "Testing 2",
    icon: (
      <Image
        src={"/images/profile3.jpg"}
        alt=""
        width={66}
        height={78}
        className="rounded-full object-cover object-center w-10 h-10"
      />
    ),
  },
  {
    link: Routes.PROFILE.absolutePath,
    title: "Testing 2",
    icon: (
      <Image
        src={"/images/profile4.jpg"}
        alt=""
        width={66}
        height={78}
        className="rounded-full object-cover object-center w-10 h-10"
      />
    ),
  },
  {
    link: Routes.PROFILE.absolutePath,
    title: "Testing 2",
    icon: (
      <Image
        src={"/images/profile5.jpg"}
        alt=""
        width={66}
        height={78}
        className="rounded-full object-cover object-center w-10 h-10"
      />
    ),
  },
];
