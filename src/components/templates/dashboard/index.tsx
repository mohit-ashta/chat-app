import { useEffect } from "react";
import Layout from "@/components/organisms/layout";
import { useQuery } from "react-query";
import { useGetUsers } from "@/pages/api/user-data";
import useAddNewUser from "@/pages/api/add-data";

export const DashboardTemplate = () => {
  const { data: users, isLoading, isError } = useGetUsers();

  const { mutate: addUser, isLoading: isAddingUser, error } = useAddNewUser();

  const handleAddUser = () => {
    // Example usage of the addUser mutation
    addUser({ title: "New User Title", subtitle: "New User Subtitle" });
  };

  return (
    <Layout>
      <div className="bg-BgColor2 h-full p-4 text-red-400">
        Hey Mohit!
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error fetching data</div>}
        {users &&
          users.map((item) => (
            <div key={item.id}>
              <h2>send: {item.subtitle}</h2>
              <h2>data: {item.title}</h2>
            </div>
          ))}
        <button onClick={handleAddUser}>Add New User</button>
      </div>
    </Layout>
  );
};
