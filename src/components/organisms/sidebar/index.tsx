import { useGetUsers } from "@/pages/api/user-data";
import React, { useEffect, useState } from "react";
import TopFilter from "../filter-list";
import Link from "next/link";
import { useAuth, useUser } from "@clerk/nextjs";

export const SidebarList = () => {
  const { data: usersData, isLoading, isError } = useGetUsers();
  const { isLoaded, userId, getToken } = useAuth();

  if (isLoading) {
    return (
      <div className="bg-BgColor w-[300px] border  border-[#353535] shadow-[#ffffff]">
        <p>Loading...</p>{" "}
      </div>
    );
  }
  if (!isLoaded || !userId) {
    return null;
  }

  if (isError || usersData === undefined) {
    return <p>Error loading data</p>;
  }
  const filteredUsersData = usersData.filter((user: any) => {
    return Object.keys(user.userId)[0] !== userId;
  });

  return (
    <div className="bg-BgColor w-[300px] border border-dashded border-r-[#353535] shadow-[#ffffff] lg:flex flex-col gap-2">
      <TopFilter />
      <div>
        {filteredUsersData.length > 0 ? (
          <ul>
            {filteredUsersData.map((user: any, idx) => {
              return (
                <Link
                  href={`dashboard/${Object.keys(user.userId)[0]}`}
                  key={idx}
                >
                  <h2 className="text-black py-2 mb-1 pl-4 bg-greyish text-black uppercase">
                    {user.receiverName}
                  </h2>
                </Link>
              );
            })}
          </ul>
        ) : (
          <p>No other users found.</p>
        )}
      </div>
    </div>
  );
};
