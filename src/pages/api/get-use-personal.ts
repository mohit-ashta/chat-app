import { get, ref } from "firebase/database";
import { database } from "@/firebaseConfig";
import { useQuery } from "react-query";

interface ChatInboxProps {
  content: string;
  senderName: string;
  timestamp: number;
  userId: string;
}

interface FilteredChatProps extends ChatInboxProps {
  content: string;
  senderName: string;
  timestamp: number;
  userId: string;
  isIncoming: boolean;
}

const PersonalInbox = async (currentUserId: string): Promise<FilteredChatProps[]> => {
  const usersRef = ref(database, `room1/message`);
  const snapshot = await get(usersRef);
  const data = snapshot.val();

  // Check if data is null or undefined
  if (data === null || data === undefined) {
    return [];
  }

  // Convert the data object to an array of User objects
  const PersonalChat: ChatInboxProps[] = Object.values(data);
console.log(PersonalChat,"PersonalChat");

  // Filter the PersonalChat array to return only the messages that are sent by or received by the current user
  const FilteredChat: FilteredChatProps[] = PersonalChat.map((chat) => {
    return {
      ...chat,
      isIncoming: chat.userId !== currentUserId,
    };
  }).filter((chat) => {
    return chat.isIncoming;
  });

  return FilteredChat;
};

export const usePersonalInbox = (currentUserId: string) => {
  return useQuery<FilteredChatProps[], Error>(["personalInbox", currentUserId], () => PersonalInbox(currentUserId));
};