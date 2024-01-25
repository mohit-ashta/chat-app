import { useGetUsers } from "@/pages/api/user-data";
import React, { useEffect, useState } from "react";
import TopFilter from "../filter-list";
import Link from "next/link";
import { useAuth, useUser } from "@clerk/nextjs";

export const SidebarList = () => {
  const { data: users, isLoading, isError } = useGetUsers();
  const { isLoaded, userId, getToken } = useAuth();

  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      setUserToken(token);
    };

    if (isLoaded && userId) {
      fetchToken();
    }
  }, [isLoaded, userId, getToken]);

  if (isLoading) {
    return (
      <div className="bg-BgColor w-[300px] border  border-[#353535] shadow-[#ffffff]">
        <p >Loading...</p>{" "}
      </div>
    );
  }

  // In case the user signs out while on the page.
  if (!isLoaded || !userId) {
    return null;
  }

  if (isError || users === undefined) {
    return <p>Error loading data</p>;
  }

  console.log(userToken, "userToken");

  // Filter users to show only other users if the token exists
  const filteredUsers = userToken
    ? users.filter((user) => user.id !== userId)
    : users;
  console.log(filteredUsers, "filteredUsers");
  console.log(users, "users");
  return (
    <div className="bg-BgColor w-[300px] border border-dashded border-r-[#353535] shadow-[#ffffff] lg:flex flex-col gap-2">
      <TopFilter />
      <div>
        <h2>User List</h2>
        {filteredUsers.length > 0 ? (
          <ul>
            {filteredUsers.map((user) => (
              <Link href={`dashboard/${user.id}`} key={user.id}>
                <li className="text-black">
                  {user.id} - {user.name}
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <p>No other users found.</p>
        )}
      </div>
    </div>
  );
};
