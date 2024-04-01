import { useEffect, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { useUser } from "@clerk/clerk-react";
import Layout from "@/components/organisms/layout";
import { useRouter } from "next/router";

import { sendMessageMutation } from "@/pages/api/send-message";
import { usePersonalInbox } from "../api/get-use-personal";
import { onValue, ref, off, push } from "firebase/database";
import { database } from "@/firebaseConfig";

const PersonalInboxChat = () => {
  const router = useRouter();
  const { user_id } = router.query;

  const { data: personalInbox, isLoading, isError } = usePersonalInbox("");

  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const { isLoaded, isSignedIn, user } = useUser();

  let jwtToken: any;
  if (typeof window !== "undefined") {
    jwtToken = localStorage.getItem("clerk-db-jwt");
  }

  const currentId = user?.id || "";
  const userEmail = user?.emailAddresses?.[0]?.emailAddress || "";
  const userName = user?.username || "";
  const clerkUserData = {
    currid: currentId,
    name: userName,
    email: userEmail,
  };

  useEffect(() => {
    if (currentId) {
      const userID = clerkUserData.currid;
      const CurName = clerkUserData.name;
      const allUsersMessagesRef = ref(
        database,
        `room1/messages${userID}/${CurName}`
      );
      const allUsersUnsubscribe = onValue(allUsersMessagesRef, (snapshot) => {
        snapshot.forEach((userSnapshot) => {
          const userId = userSnapshot.key;
          userSnapshot.forEach((messageSnapshot) => {
            const messageData = messageSnapshot.val();
            if (userId !== clerkUserData.currid) {
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
        allUsersUnsubscribe();
      };
    }
  }, [currentId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      const targetUserId: any = user_id || "";

      sendMessageMutation(
        targetUserId,
        clerkUserData.currid,
        clerkUserData.name,
        newMessage
      );
      setNewMessage("");
    }
  };

  const inboxMessages = personalInbox || [];

  return (
    <Layout>
      <div className="bg-BgColor2 h-full p-4  overflow-y-scroll ">
        <div className="text-center text-black">personal chat</div>

        <div>
          {inboxMessages.length > 0 && (
            <>
              {inboxMessages
                .sort((a, b) => a.timestamp - b.timestamp)
                .map((message) => {
                  const isCurrentUser = message.userId === currentId;
                  const isTokenMatch = jwtToken && message.userId === currentId;

                  const messagePositionClass = isCurrentUser
                    ? "text-right"
                    : isTokenMatch
                    ? "text-right"
                    : "text-left";

                  return (
                    <div
                      key={message.userId}
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
                          {isCurrentUser ? "You" : message.senderName}
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

export default PersonalInboxChat;
