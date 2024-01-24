// import { useEffect, useState } from "react";
// import { RiSendPlaneFill } from "react-icons/ri";
// import { useUser } from "@clerk/clerk-react";
// import Layout from "@/components/organisms/layout";
// import { onValue, ref } from "firebase/database";
// import { database } from "@/firebaseConfig";
// import { useRouter } from "next/router";
// import { usePersonalInbox } from "@/pages/api/personal-inbox";
// import { sendMessageMutation } from "@/pages/api/send-message";

// // ... (import statements remain unchanged)

// const Testd = () => {
//   const router = useRouter();
//   const { user_id } = router.query;
//   useEffect(() => {}, [user_id]);

//   // all state
//   const [newMessage, setNewMessage] = useState("");
//   const [messages, setMessages] = useState<any[]>([]);
//   // mutations
//   const { isLoaded, isSignedIn, user } = useUser();
//   const { data, isLoading, isError } = usePersonalInbox();

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
//     if (newMessage.trim() !== "") {
//       const targetUserId: any = user_id || ""; // Use the user_id from the router query
//       sendMessageMutation(targetUserId, clerkUserData.name, newMessage);
//       setNewMessage("");
//     }
//   };

//   return (
//     <Layout>
//       <div className="bg-BgColor2 h-full p-4  overflow-y-scroll ">
//         <div className="text-center text-black">personal chat</div>
//         <div className=" relative "></div>
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
