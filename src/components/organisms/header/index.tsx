import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <>
      <header>
        <nav className=" flex w-full items-center justify-between bg-white h-20 text-neutral-600 shadow-lg  focus:text-greyish  dark:text-neutral-200 md:flex-wrap md:justify-start">
          <div className="flex w-full items-center justify-between px-3">
         
              <Image
                alt="chat"
                src={"/images/GSlogo.jpg"}
     
                width={100}
                height={100}
              />
         

            <div className=" flex   items-center ">
              <ul className="mr-auto flex items-center">
                <UserButton afterSignOutUrl="/" />
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
