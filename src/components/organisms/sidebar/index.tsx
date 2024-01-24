import { useGetUsers } from "@/pages/api/user-data";
import React from "react";
import TopFilter from "../filter-list";
import Link from "next/link";

export const SidebarList = () => {
  const { data: users, isLoading, isError } = useGetUsers();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || users === undefined) {
    return <p>Error loading data</p>;
  }
  console.log(users, "33");

  return (
    <div className="bg-BgColor w-[300px] border border-dashded border-r-[#353535] shadow-[#ffffff] lg:flex flex-col gap-2">
      <TopFilter />
      <div>
        <h2>User List</h2>
        {users.length > 0 ? (
          <ul>
            {users.map((user) => (
                <Link href={`dashboard/${user.id}`} key={user.id}>
              <li >{user.id}</li></Link>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};
