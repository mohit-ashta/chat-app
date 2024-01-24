import { ref, get } from "firebase/database";
import { database } from "@/firebaseConfig";
import { useQuery } from "react-query";
import Layout from "@/components/organisms/layout";

// Define the user interface
interface User {
  id: string;
  // Add other properties as needed
}

const getData = async () => {
  const usersRef = ref(database, "room1/message")

  try {
    const snapshot = await get(usersRef);

    if (snapshot.exists()) {
      const usersObject = snapshot.val();
      const usersArray = Object.keys(usersObject).map((id) => ({
        id,
        ...usersObject[id],
      }));
      return usersArray;
    } else {
      throw new Error("Snapshot exists, but no data");
    }
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
};

export const useGetUsers = () => {
  return useQuery<User[], Error>("user", getData);
};