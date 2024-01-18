// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCz8XuKact7LqZi5vpZDxyIw1obMBTTfo4",
  authDomain: "chat-app-d3efe.firebaseapp.com",
  databaseURL: "https://chat-app-d3efe-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "chat-app-d3efe",
  storageBucket: "chat-app-d3efe.appspot.com",
  messagingSenderId: "56179676041",
  appId: "1:56179676041:web:4cff7ba1626d9dfdbf0758",
  measurementId: "G-HS5DREW286"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)

export {database} ;