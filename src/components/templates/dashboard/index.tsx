import Layout from "@/components/organisms/layout";
import { RiSendPlaneFill } from "react-icons/ri";
import React, { useState, useEffect } from "react";
import { database } from "@/firebaseConfig";
import { useUser } from "@clerk/clerk-react";
import { onValue, ref, off, push } from "firebase/database";

// ... (previous imports)

export const DashboardTemplate = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const userId = user?.id;
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;
  const userName = user?.username;

  const clerkUserData = {
    id: userId,
    name: userName,
    email: userEmail,
  };

  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  let jwtToken: any;
  if (typeof window !== "undefined") {
    jwtToken = localStorage.getItem("clerk-db-jwt");
  } else {
    console.log("Cannot access localStorage on the server side. token console");
  }

  useEffect(() => {
    if (userId) {
      const userID = clerkUserData.id;
      const messagesRef = ref(database, `room1/messages/${userID}`);
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

      const allUsersMessagesRef = ref(database, "room1/messages");
      const allUsersUnsubscribe = onValue(allUsersMessagesRef, (snapshot) => {
        snapshot.forEach((userSnapshot) => {
          const userId = userSnapshot.key;
          userSnapshot.forEach((messageSnapshot) => {
            const messageData = messageSnapshot.val();
            if (userId !== clerkUserData.id) {
              const newMessage = {
                id: messageSnapshot.key,
                userId: userId,
                userName: messageData.senderName,
                userEmail: "",
                content: messageData.content,
                timestamp: messageData.timestamp,
              };
              setMessages((prevMessages) => [...prevMessages, newMessage]);
            }
          });
        });
      });

      return () => {
        off(messagesRef);
        off(allUsersMessagesRef);
        unsubscribe();
        allUsersUnsubscribe();
      };
    }
  }, [userId]);

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      const userID = clerkUserData.id;
      const messagesRef = ref(database, `room1/messages/${userID}`);
      push(messagesRef, {
        senderName: clerkUserData.name,
        content: newMessage,
        timestamp: new Date().getTime(),
      });
      setNewMessage("");
    }
  };

  return (
    <Layout>
      <div className="bg-BgColor2 h-full p-4  overflow-y-scroll ">
        <div className="text-center text-black">today</div>
        <div className=" relative ">
          {messages.length > 0 && (
            <>
              {messages
                .sort((a, b) => a.timestamp - b.timestamp)
                .map((message) => {
                  const isCurrentUser = message.userId === userId;
                  console.log(isCurrentUser, "isCurrentUser");
                  const isTokenMatch =
                    jwtToken && message.userId === clerkUserData.id;

                  const messagePositionClass = isCurrentUser
                    ? "text-right"
                    : isTokenMatch
                    ? "text-right"
                    : "text-left";

                  return (
                    <div
                      key={message.id}
                      className={`my-3 ${messagePositionClass}`}
                    >
                      <div
                        className={`flex flex-col ${
                          isCurrentUser ? "items-end" : "items-start"
                        }`}
                      >
                        <p
                          className={`text-xs pb-1 ${
                            isCurrentUser ? "text-right" : "text-left"
                          }`}
                        >
                          {isCurrentUser ? "You" : message.userName}
                        </p>
                        <div className="bg-white w-auto py-1 px-3 rounded max-w-[65%] break-all">
                          <p className="text-left">
                            {message.content}
                            <sub className="ml-2 text-gray-500 text-[10px]">
                              {new Date(message.timestamp)
                                .toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })
                                .replace(/^00/, "12")}
                            </sub>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </>
          )}
        </div>
        <div className="fixed bottom-4 left-[297px] right-4 ">
          <form
            className="border flex items-center bg-greyish "
            onSubmit={handleSendMessage}
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full bg-transparent focus:outline-none px-3 "
              placeholder="Type a Message "
            />
            <button className="bg-slate-300 text-black p-2" type="submit">
              <RiSendPlaneFill size={28} />
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};
