// import { useEffect, useState } from "react";
// import { RiSendPlaneFill } from "react-icons/ri";
// import { useUser } from "@clerk/clerk-react";

// import Layout from "@/components/organisms/layout";
// import { sendMessageMutation } from "../api/send-message";
// import { onValue, ref } from "firebase/database";
// import { database } from "@/firebaseConfig";
// import { usePersonalInbox } from "../api/get-use-personal";
// import { auth } from "@clerk/nextjs";

// const Testd = () => {


//   // all state
//   const [newMessage, setNewMessage] = useState("");
//   const [messages, setMessages] = useState<any[]>([]);
//   // mutations
//   const { isLoaded, isSignedIn, user } = useUser();
//   const { data, isLoading, isError } = usePersonalInbox("");

//   // check token
//   let jwtToken: any;
//   if (typeof window !== "undefined") {
//     jwtToken = localStorage.getItem("clerk-db-jwt");
//   } else {
//     console.log("Cannot access localStorage on the server side.");
//   }
//   // user variables
//   const userId = user?.id || "";
//   const userEmail = user?.emailAddresses?.[0]?.emailAddress || "";
//   const userName = user?.username || "";
//   const clerkUserData = {
//     id: userId,
//     name: userName,
//     email: userEmail,
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error loading data</div>;
//   }

//   // send messages
//   const handleSendMessage = (e: any) => {
//     e.preventDefault();
//     const targetUser: any =auth.name  ;
//     if (newMessage.trim() !== "") {
//       sendMessageMutation(
//         targetUser,
//         clerkUserData.id,
//         clerkUserData.name,
//         newMessage
//       );
//       setNewMessage("");
//     }
//   };
//   const inboxMessages = data || [];


//   return (
//     <Layout>
//       <div className="bg-BgColor2 h-full p-4  overflow-y-scroll ">
//         <div className="text-center text-black">today</div>
//         <div className=" relative ">
//           <div className="bg-red-300">
//             <div className="bg-red-300">
//               {inboxMessages.length > 0 ? (
//                 inboxMessages.map((message: any) => (
//                   <div className="bg-red-400" key={message.id}>
//                     {message.text}
//                   </div>
//                 ))
//               ) : (
//                 <div>No messages available</div>
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="fixed bottom-4 left-[297px] right-4 ">
//           <form
//             className="border flex items-center bg-greyish "
//             onSubmit={handleSendMessage}
//           >
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               className="w-full bg-transparent focus:outline-none px-3 "
//               placeholder="Type a Message "
//             />
//             <button className="bg-slate-300 text-black p-2" type="submit">
//               <RiSendPlaneFill size={28} />
//             </button>
//           </form>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Testd;
import React from 'react'

const index = () => {
  return (
    <div>index</div>
  )
}

export default index