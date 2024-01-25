import { ref, get } from "firebase/database";
import { database } from "@/firebaseConfig";
import { useQuery } from "react-query";

// Define the user interface
interface User {
  id: string;
  name: string; // Include the 'name' property
  // Add other properties as needed
}
const getData = async () => {
  const usersRef = ref(database, "room1/message");

  try {
    const snapshot = await get(usersRef);
    console.log("sssssssss",snapshot);
    if (snapshot.exists()) {
      const messagesObject = snapshot.val();
      console.log(messagesObject); // Log the data to the console
      const messagesArray = Object.keys(messagesObject).map((id) => ({
        id,
        name: messagesObject[id]?.name ?? "Unknown", // Access 'name' property correctly
        // Add other properties as needed
      }));
      console.log("sssssssss",messagesArray);
      
      return messagesArray;

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
