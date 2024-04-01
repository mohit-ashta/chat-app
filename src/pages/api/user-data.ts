import { ref, get } from "firebase/database";
import { database } from "@/firebaseConfig";
import { useQuery } from "react-query";

interface User {
  id: string;
  name: string;
}
const getData = async () => {
  const usersRef = ref(database, "room1/messages");

  function getReceiverNamesAndIdsExcludingLoggedInUser(
    data: any
    // loggedInUserId: string
  ) {
    var receiverInfo: any[] = [];
    for (var senderId in data) {
      // if (senderId !== loggedInUserId) {
      //   continue;
      // }
      var senderData = data[senderId];
      for (var receiverName in senderData) {
        if (!receiverInfo.some((info) => info.receiverName === receiverName)) {
          receiverInfo.push({
            receiverName: receiverName,
            userId: senderData[receiverName],
          });
        }
      }
    }
    return receiverInfo;
  }
  // const loggedInUserId = "user_2bApcOnFoVnxwKEa8kMh312E54f";
  try {
    const snapshot = await get(usersRef);

    if (snapshot.exists()) {
      const messagesObject = snapshot.val();

      var receiverName = getReceiverNamesAndIdsExcludingLoggedInUser(
        messagesObject
        // loggedInUserId
      );
      return receiverName;
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
