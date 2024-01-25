// firebaseUtils.ts
import { ref, push } from "firebase/database";
import { database } from "@/firebaseConfig";

interface Message {
  userId: string;
  senderId: string;
  name: string;
  timestamp: number;
  messages: string;
}

// message send
export const sendMessageMutation = async (
  userId: string,
  senderId: string,
  name: string,
  messages: string
): Promise<void> => {
  const messagesRef = ref(
    database,
    `room1/message/${userId}/${name}/${senderId}`
  );
  const message: Message = {
    userId,
    senderId,
    name,
    messages,
    timestamp: new Date().getTime(),
  };
  await push(messagesRef, message);
};
