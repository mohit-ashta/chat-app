import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <>
      <header>
        <nav className=" flex w-full items-center justify-between bg-white h-20 text-neutral-600 shadow-lg  focus:text-greyish dark:bg-red-600 dark:text-neutral-200 md:flex-wrap md:justify-start">
          <div className="flex w-full items-center justify-between px-3">
            <div className="flex items-center">Chat App</div>

            <div className=" flex   items-center ">
              <ul className="mr-auto flex items-center">
                <li className="mb-4 lg:mb-0 lg:pr-2">
                  <Image
                    src="/images/profile2.jpg"
                    alt=""
                    width={30}
                    height={30}
                    className="rounded-full object-cover object-center w-10 h-10  "
                  />
                </li>
                <li>testing testing</li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
