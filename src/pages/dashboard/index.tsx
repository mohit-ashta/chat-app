import React, { useState, useEffect } from "react";
import { database } from "@/firebaseConfig";
import { useUser } from "@clerk/clerk-react";
import { onValue, ref, off, push } from "firebase/database";

type UseUserReturn = {
  isLoaded: boolean;
  isSignedIn: boolean;
  user: {
    id: string;
    // other properties...
  };
};

function MyComponent() {
  const { isLoaded, isSignedIn, user } = useUser();
  const userId = user?.id;
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;
  const userName = user?.fullName;

  const clerkUserData = {
    id: userId,
    name: userName,
    email: userEmail,
  };

  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    if (userId) {
      const userID = clerkUserData.id;
      const messagesRef = ref(database, `messages/${userID}`);
      const unsubscribe = onValue(messagesRef, (snapshot) => {
        const newMessages: any[] = [];
        snapshot.forEach((childSnapshot) => {
          const messageData = childSnapshot.val();
          newMessages.push({
            id: childSnapshot.key,
            userId: userId,
            userName: clerkUserData.name,
            userEmail: clerkUserData.email,
            content: messageData.content,
            timestamp: messageData.timestamp,
          });
        });
        setMessages(newMessages);
      });

      return () => {
        off(messagesRef);
        unsubscribe();
      };
    }
  }, [userId, clerkUserData]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const userID = clerkUserData.id;
      const messagesRef = ref(database, `messages/${userID}`);
      push(messagesRef, {
        content: newMessage,
        timestamp: new Date().getTime(),
      });
      setNewMessage("");
    }
  };

  return (
    <div>
      {clerkUserData.id && (
        <div className="bg-red-300">
          User ID: {clerkUserData.id}
        </div>
      )}
      {messages.length > 0 && (
        <div className="bg-red-300">
          Messages:
          {messages.map((message) => (
            <div key={message.id}>
              {message.userName}: {message.content}
            </div>
          ))}
        </div>
      )}
      <div>
        <input
          type="text"
          value={newMessage}
          className="text-black"
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default MyComponent;
